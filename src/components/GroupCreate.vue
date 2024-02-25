<!-- GroupCreationPage.vue -->
<template>
    <div>
      <h2>그룹 생성</h2>
      <form @submit.prevent="createGroup">
        <label for="groupName">그룹 이름:</label>
        <input type="text" id="groupName" v-model="groupName" required>
        <button type="submit">생성</button>
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
      async createGroup() {
        try {
          const response = await axios.post('http://localhost:8080/groups/new', {
            name: this.groupName
          }, {
            withCredentials: true
          });
          console.log('Group created:', response.data);
          // Optionally, you can redirect the user to the group detail page after creation
          this.$router.push(`/my-group-list`);
        } catch (error) {
          console.error('Error creating group:', error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
  