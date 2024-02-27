<template>
  <div class="main-page">
    <div class="button-container">
      <button @click="goToMyProfile">내 프로필</button>
      <button @click="logout">로그아웃</button>
    </div>
    <MyGroupList />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import MyGroupList from './MyGroupList.vue';

export default {
  name: 'MainPage',
  components: {
    MyGroupList
  },
  data() {
    return {
      errorMessage: ''
    };
  },
  methods: {
    async logout() {
      try {
        await axios.post(`http://localhost:8080/members/logout`, null, {
          withCredentials: true
        });
        // Vuex store의 logout 뮤테이션을 호출하여 로그아웃 상태 변경
        this.$store.commit('logout');
        // 로그인 페이지로 이동
        this.$router.push('/login');
      } catch (error) {
        console.error('Error fetching post detail:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    goToMyProfile() {
      // 내 프로필 페이지로 이동
      this.$router.push('/my-profile');
    }
  }
}
</script>

<style scoped>
.main-page {
  margin-top: 10px;
}

.button-container {
  margin-bottom: 20px;
}

.button-container button {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-container button:hover {
  background-color: #a8aaac;
  color: white;
}
.error-message {
  color: red;
  font-size: 14px;
}
</style>
