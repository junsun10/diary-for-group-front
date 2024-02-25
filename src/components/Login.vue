<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="name" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">로그인</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      id: '',
      name: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/members/login', {
          name: this.name,
          password: this.password
        },
        {
          withCredentials: true
        });
        
        if (response.status === 200) {
          // 로그인 성공
          // Vuex store의 login 뮤테이션을 호출하여 로그인 상태 변경
          this.$store.commit('login', {userId: response.data.id, userName: response.data.name});
          // 메인 페이지로 이동
          this.$router.push('/main');
        } else {
          // 로그인 실패
          this.errorMessage = 'Invalid username or password';
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred during login';
      }
    }
  }
};
</script>
