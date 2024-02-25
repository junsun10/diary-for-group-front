<!-- MyGroupList.vue -->
<template>
  <div>
    <h2>그룹 목록</h2>
    <table class="group-table">
      <thead>
        <tr>
          <th>그룹 이름</th>
          <th>멤버</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groupList" :key="group.id" @click="goToGroupDetail(group.id)">
          <td>{{ group.name }}</td>
          <td>{{ group.groupMembersId.length }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="button-row">
      <GroupCreationButton/>
      <GroupJoinButton/>
    </div>
</template>
  
<script>
import axios from 'axios';
import GroupCreationButton from '@/components/button/GroupCreationButton.vue';
import GroupJoinButton from '@/components/button/GroupJoinButton.vue';

export default {
  components: {
    GroupCreationButton,
    GroupJoinButton
  },
  data() {
    return {
      groupList: []
    };
  },
  mounted() {
    this.fetchPostList();
  },
  methods: {
    async fetchPostList() {
      try {
        const response = await axios.get(`http://localhost:8080/groups/my`,
        {
          withCredentials: true
        });
        this.groupList = response.data;
        console.log('groupList:', this.groupList);
      } catch (error) {
        console.error('Error fetching post list:', error);
      }
    },
    goToGroupDetail(groupId) {
      this.$router.push(`/group/${groupId}`);
    },
  }
}
</script>
  
<style scoped>
.group-table {
  margin: 0 auto;
  border: 1px solid black;
  width: 80%; /* 테이블 너비 조정 */
}
.group-table th, .group-table td {
  border: 1px solid black;
  padding: 0.5em;
  cursor: pointer;
  text-align: center;
}
.group-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.button-row {
  display: flex;
  margin-top: 10px;
  justify-content: center;
}
</style>