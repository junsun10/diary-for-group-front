<!-- GroupJoin.vue -->
<template>
    <div>
      <h2>그룹 가입</h2>
      <form @submit.prevent="joinGroup">
        <label for="groupName">그룹 이름:</label>
        <input type="text" id="groupName" v-model="groupName" required>
        <button type="submit">가입 신청</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        groupName: ''
      };
    },
    methods: {
      async joinGroup() {
        try {
          const response = await axios.post('http://localhost:8080/group-member/new', {
            groupName: this.groupName
          }, {
            withCredentials: true
          });
          console.log('Group joined:', response.data);
          // Optionally, you can redirect the user to the group detail page after joining
          this.$router.push(`/my-group-list`);
        } catch (error) {
          console.error('Error joining group:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
  