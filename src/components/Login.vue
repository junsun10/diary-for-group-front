<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="login" class="login-form">
      <input type="text" v-model="name" placeholder="Username" class="form-control" required>
      <input type="password" v-model="password" placeholder="Password" class="form-control" required>
      <button type="submit" class="btn-submit">로그인</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default {
  name: 'LoginPage',
  data() {
    return {
      name: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        // 비밀번호 암호화
        const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);
        const response = await axios.post('http://localhost:8080/members/login', {
          name: this.name,
          password: hashedPassword
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
        }
      } catch (error) {
        console.error('Error logging in:', error.response.data.message);
        this.errorMessage = error.response.data.message;
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.btn-submit {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #a8aaac;
  color: white;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>
