<template>
    <div>
      <h2>일기 수정</h2>
      <form @submit.prevent="editPost">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="editedPost.title" required>
        </div>
        <div>
          <label for="content">Content:</label>
          <textarea id="content" v-model="editedPost.body" required></textarea>
        </div>
        <button type="submit">저장</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        editedPost: {}
      };
    },
    mounted() {
      // 이 컴포넌트가 마운트될 때, postId에 해당하는 포스트 정보를 가져와 편집합니다.
      this.fetchPost();
    },
    methods: {
      async fetchPost() {
        try {
          const postId = this.$route.params.postId;
          const response = await axios.get(`http://localhost:8080/posts/${postId}`,
          {withCredentials: true});
          this.editedPost = response.data;
          console.log('Fetched post:', this.editedPost.title, this.editedPost.body);
          console.log('Fetched post:', this.editedPost.id, this.editedPost.groupId);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      },
      async editPost() {
        try {
          const postId = this.$route.params.postId;
          console.log('Editing post:', postId, this.editedPost.title, this.editedPost.body);
          console.log(this.$route.params.postId, this.editedPost.groupId);
          await axios.post(`http://localhost:8080/posts/${postId}/edit`,
          {
            id: this.editedPost.id,
            groupId: this.editedPost.groupId,
            title: this.editedPost.title,
            body: this.editedPost.body
          },
          {
            withCredentials: true
          },
          );
          this.$router.push(`/post/${postId}`);
        } catch (error) {
          console.error('Error editing post:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>