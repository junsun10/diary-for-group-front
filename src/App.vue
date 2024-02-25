<!-- App.vue -->
<template>
  <h1 @click="goToMainPage">일기장</h1>
  <button @click="goToMainPage">홈</button>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goToMainPage() {
      if (this.$store.state.isLoggedIn) {
        this.$router.push('/main');
      } else {
        this.$router.push('/before-login');
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
