<template>
  <div>
    <h2>일기 작성</h2>
    <form @submit.prevent="submitDiary" class="form-container">
      <div class="form-group">
        <label for="title" class="label">제목</label>
        <input type="text" id="title" v-model="title" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="content" class="label">내용</label>
        <textarea id="content" v-model="body" class="form-control" required></textarea>
      </div>
      <button type="submit" class="btn-submit">저장</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      body: '',
      errorMessage: ''
    };
  },
  methods: {
    async submitDiary() {
      try {
        const response = await axios.post(`/posts/new`, {
          groupId: this.$route.params.groupId,
          title: this.title,
          body: this.body
        }, {
          withCredentials: true
        });
        console.log('일기가 성공적으로 저장되었습니다:', response.data);
        this.$router.push('/post/' + response.data.id);
      } catch (error) {
        console.error('일기 저장에 실패했습니다:', error);
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
