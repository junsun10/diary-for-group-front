<!-- GroupCreationPage.vue -->
<template>
  <div>
    <h2>그룹 생성</h2>
    <form @submit.prevent="createGroup" class="form-container">
      <label for="groupName" class="label">그룹 이름</label>
      <input type="text" id="groupName" v-model="groupName" class="form-control" required>
      <button type="submit" class="button">생성</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      groupName: '',
      errorMessage: ''
    };
  },
  methods: {
    async createGroup() {
      try {
        const response = await axios.post(`/groups/new`, {
          name: this.groupName
        }, {
          withCredentials: true
        });
        console.log('Group created:', response.data);
        this.$router.push(`/main`);
      } catch (error) {
        console.error('Error creating group:', error);
        this.errorMessage = error.response.data.message;
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 10px;
  font-size: 14px;
}

.button:hover {
  background-color: #a8aaac;
  color: white;
}
.error-message {
  color: red;
  font-size: 14px;
}
</style>
