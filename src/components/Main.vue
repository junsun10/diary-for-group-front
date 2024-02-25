<!-- Main.vue -->
<template>
  <div class="button">
    <button @click="goToMyProfile">내 프로필</button>
    <button @click="logout">로그아웃</button>
    <MyGroupList />
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
      }
    },
    goToMyProfile() {
      // 내 프로필 페이지로 이동
      this.$router.push('/my-profile');
    },
  }
}
</script>

<style scoped>
.button {
  margin-top: 10px;
}
</style>