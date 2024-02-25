<template>
    <div>
        <div>
            <button @click="goToLogin">로그인</button>
            <button @click="goToSignUp">회원가입</button>
        </div>
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
