<template>
    <div>
      <h2>일기 수정</h2>
      <form @submit.prevent="editPost" class="form-container">
        <div class="form-group">
          <label for="title" class="label">Title:</label>
          <input type="text" id="title" v-model="editedPost.title" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="content" class="label">Content:</label>
          <textarea id="content" v-model="editedPost.body" class="form-control" required></textarea>
        </div>
        <button type="submit" class="btn-submit">저장</button>
      </form>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        editedPost: {},
        errorMessage: ''
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
          this.errorMessage = error.response.data.message;
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
          this.errorMessage = error.response.data.message;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  textarea.form-control {
    height: 200px; /* 여기서 높이를 조정할 수 있습니다. */
  }
  
  .btn-submit {
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-submit:hover {
    background-color: #a8aaac;
    color: white;
  }
  .error-message {
  color: red;
  font-size: 14px;
}
  </style>