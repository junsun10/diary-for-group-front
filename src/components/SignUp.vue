<template>
    <div>
      <h2>회원가입</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">아이디:</label>
          <input type="text" id="username" v-model="formData.name" required>
        </div>
        <div>
          <label for="password">비밀번호:</label>
          <input type="password" id="password" v-model="formData.password" required>
        </div>
        <div>
          <label for="email">이메일:</label>
          <input type="email" id="email" v-model="formData.email" required>
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          name: '',
          password: '',
          email: ''
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post('http://localhost:8080/members/new',
          this.formData,
          {
            withCredentials: true
          });
          console.log('회원가입 성공:', response.data);
          this.$router.push('/login');
        } catch (error) {
          console.error('회원가입 실패:', error.response.data.message);
          // 회원가입 실패 처리
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 스타일 작성 */
  </style>
  