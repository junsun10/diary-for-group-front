
<template>
  <div>
    <button @click="goToGroupManagement(groupId)">그룹 관리</button>
  </div>
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
/* Add your styles here if needed */
</style>