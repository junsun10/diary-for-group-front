<!-- GroupManagement.vue -->
  <template>
    <div>
      <!-- 그룹 삭제 버튼 -->
      <button class="button" @click="confirmDelete">그룹 삭제</button>
    </div>
    <div>
      <h2>그룹 멤버</h2>
      <table class="current-members-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>동작</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="member in currentMembers" :key="member.id">
            <td>{{ member.memberName }}</td>
            <td>
              <button v-if="member.memberName !== userName" @click="removeMember(member.memberId)" class="smallButton">추방</button>
              <span v-else>그룹장</span>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>가입 요청 목록</h2>
      <table class="join-requests-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>동작</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in joinRequests" :key="request.id">
            <td>{{ request.memberName }}</td>
            <td>
              <button @click="approveRequest(request.memberId)" class="smallButton">수락</button>
              <button @click="rejectRequest(request.memberId)" class="smallButton">거절</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        joinRequests: [],
        currentMembers: [],
        groupId: this.$route.params.groupId,
        userName: this.$store.state.userName,
        errorMessage: ''
      };
    },
    mounted() {
      this.fetchJoinRequests();
      this.fetchCurrentMembers();
    },
    methods: {
      async confirmDelete() {
        if (confirm("정말로 그룹을 삭제하시겠습니까?")) {
          // 확인 버튼을 누른 경우 그룹 삭제 메서드 호출
          this.deleteGroup();
        } else {
          // 취소 버튼을 누른 경우 아무런 작업을 하지 않음
        }
      },
      async fetchCurrentMembers() {
        try {
          const response = await axios.get(`/group-member/${this.groupId}`, {
            withCredentials: true
          });
          console.log('Current members:', response.data);
          this.currentMembers = response.data;
        } catch (error) {
          console.error('Error fetching current members:', error);
          this.errorMessage = error.response.data.message;
        }
      },
      async fetchJoinRequests() {
        try {
          const groupId = this.$route.params.groupId;
          const response = await axios.get(`/group-member/request/${groupId}`, {
            withCredentials: true
          });
          this.joinRequests = response.data;
          console.log('Join requests:', this.joinRequests);
        } catch (error) {
          console.error('Error fetching join requests:', error);
          this.errorMessage = error.response.data.message;
        }
      },
      async removeMember(memberId) {
        try {
          const groupId = this.$route.params.groupId;
          await axios.delete(`/group-member/${groupId}/${memberId}/remove`, 
          {
            withCredentials: true
          });
          // Optionally, you can update the currentMembers list after removing
          this.fetchCurrentMembers();
          console.log('Member removed successfully.');
        } catch (error) {
          console.error('Error removing member:', error);
          this.errorMessage = error.response.data.message;
        }
      },
      async approveRequest(memberId) {
        try {
          await axios.post(`/group-member/group/accept`, 
          {
            groupId: this.groupId,
            memberId: memberId
          }, {
            withCredentials: true
          });
          // Optionally, you can update the joinRequests list after approving
          this.fetchJoinRequests();
          console.log('Request approved successfully.');
          this.fetchCurrentMembers();
        } catch (error) {
          console.error('Error approving request:', error);
          this.errorMessage = error.response.data.message;
        }
      },
      async rejectRequest(memberId) {
        console.log('groupId:', this.groupId);
        console.log('memberId:', memberId);
        try {
          await axios.post(`/group-member/group/reject`, 
          {
            groupId: this.groupId,
            memberId: memberId
          
          }, {
            withCredentials: true
          });
          this.fetchJoinRequests();
          console.log('Request rejected successfully.');
        } catch (error) {
          console.error('Error rejecting request:', error);
          this.errorMessage = error.response.data.message;
        }
      },
      async deleteGroup() {
        try {
          await axios.delete(`/groups/${this.groupId}/remove`, 
          {
            withCredentials: true
          });
          console.log('Group deleted successfully.');
          this.$router.push('/main');
        } catch (error) {
          console.error('Error deleting group:', error);
          this.errorMessage = error.response.data.message;
        }
      }
    }
  }
</script>
  
<style scoped>
.join-requests-table,
.current-members-table {
  width: 100%;
  border-collapse: collapse;
}

.join-requests-table th,
.join-requests-table td,
.current-members-table th,
.current-members-table td {
  border: 1px solid #ccc;
  padding: 8px;
  width: 50%;
}

.join-requests-table th,
.current-members-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background-color: #a8aaac;
  color: white;
}

.smallButton {
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
}
.smallButton:hover {
  background-color: #a8aaac;
  color: white;
}
.error-message {
  color: red;
  font-size: 14px;
}
</style>