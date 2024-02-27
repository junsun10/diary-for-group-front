<template>
  <div id="app">
    <h1 @click="goToMainPage" class="logo">일기장</h1>
    <button @click="goToMainPage" class="home-button">홈</button>
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

.logo {
  cursor: pointer;
  margin-bottom: 20px;
}

.home-button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.home-button:hover {
  background-color: #a8aaac;
  color: white;
}
</style>
