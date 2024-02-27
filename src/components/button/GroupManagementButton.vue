
<template>
  <button @click="goToGroupManagement(groupId)" class="button">그룹 관리</button>
</template>

<script>
export default {
  methods: {
    goToGroupManagement(groupId) {
      this.$router.push(`/group/${groupId}/management`);
    }
  },
  props: ['groupId'] // props로 groupId를 받아옴
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