<template>
    <div class="info">
      그룹간 공유되는 일기장 서비스입니다.
    </div>
    <div class="button-box">
        <button @click="goToLogin" class="button">로그인</button>
        <button @click="goToSignUp" class="button">회원가입</button>
    </div>
</template>
<script>
export default {
    methods: {
        goToLogin() {
            this.$router.push('/login');
        },
        goToSignUp() {
            this.$router.push('/sign-up');
        }
    }
};
</script>
<style scoped>
.button-box {
  margin: 10px;
}
.button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background-color: #a8aaac;
  color: white;
}
.info {
  margin: 20px;
  font-size: 20px;
  color: #666; 
}
</style>
