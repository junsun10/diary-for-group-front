<!-- GroupJoinButton.vue -->
<template>
    <button @click="goToGroupJoinPage">그룹 가입</button>
</template>
  
<script>
export default {
  methods: {
    goToGroupJoinPage() {
      this.$router.push('/group/join');
    }
  }
}
</script>
  
<style scoped>
.button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background-color: #a8aaac;
  color: white;
}
</style>
  