<template>
  <div>
    <h2>회원가입</h2>
    <form @submit.prevent="submitForm" class="signup-form">
      <div class="form-group">
        <input type="text" v-model="formData.name" placeholder="Username" class="form-control" required>
      </div>
      <div class="form-group">
        <input type="password" v-model="formData.password" placeholder="Password" class="form-control" required>
        <p v-if="!isPasswordValid" class="error-message">비밀번호는 6~20자로 만들어주세요</p>
      </div>
      <div class="form-group">
        <input type="email" v-model="formData.email" placeholder="Email" class="form-control" required>
      </div>
      <button type="submit" class="btn-submit">가입하기</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      formData: {
        name: '',
        password: '',
        email: '',
      },
      errorMessage: ''
    };
  },
  computed: {
    isPasswordValid() {
      return this.formData.password.length >= 6 && this.formData.password.length <= 20;
    },    
  },
  methods: {
    async submitForm() {
      try {
        // 비밀번호 암호화
        const hashedPassword = CryptoJS.SHA256(this.formData.password).toString(CryptoJS.enc.Hex);
        const response = await axios.post('http://localhost:8080/members/new',
        {
          name: this.formData.name,
          password: hashedPassword,
          email: this.formData.email
        },
        {
          withCredentials: true
        });
        if (response.status === 201) {
          // 회원가입 성공
          // 로그인 페이지로 이동
          console.log('회원가입 성공:', response.data);
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('회원가입 실패:', error);
        this.errorMessage = error.response.data.message;
      }
    }
  }
};
</script>
  
<style scoped>
.signup-form {
  max-width: 400px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.error-message {
  color: red;
  font-size: 14px;
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
