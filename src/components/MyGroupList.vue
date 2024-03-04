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
      <GroupCreationButton class="button"/>
      <GroupJoinButton class="button"/>
    </div>
  <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
      groupList: [],
      errorMessage: ''
    };
  },
  mounted() {
    this.fetchPostList();
  },
  methods: {
    async fetchPostList() {
      try {
        const response = await axios.get(`/groups/my`,
        {
          withCredentials: true
        });
        this.groupList = response.data;
        console.log('groupList:', this.groupList);
      } catch (error) {
        console.error('Error fetching post list:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    goToGroupDetail(groupId) {
      this.$router.push(`/group/${groupId}`);
    },
  }
}
</script>
  
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  padding: 8px;
  border: 1px solid #ddd;
}

td {
  padding: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
}

.button-row {
  display: flex;
  margin: 10px;
  justify-content: center;
}
.error-message {
  color: red;
  font-size: 14px;
}
</style>