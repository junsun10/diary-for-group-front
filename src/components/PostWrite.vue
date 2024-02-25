<template>
    <div>
      <h2>일기 작성</h2>
      <form @submit.prevent="submitDiary">
        <div>
          <label for="title">제목:</label>
          <input type="text" id="title" v-model="title" required>
        </div>
        <div>
          <label for="content">내용:</label>
          <textarea id="content" v-model="body" required></textarea>
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
        title: '',
        body: '',

    };
    },
    mounted() {
    },
    methods: {
      async submitDiary() {
        try {
          const response = await axios.post('http://localhost:8080/posts/new',
          {
              groupId: this.$route.params.groupId,
              title: this.title,
              body: this.body
          },{
            withCredentials: true
          });
          console.log('일기가 성공적으로 저장되었습니다:', response.data);
          // 저장 성공 시 상세 페이지로 이동
          this.$router.push('/post/' + response.data.id);
        } catch (error) {
          console.error('일기 저장에 실패했습니다:', error);
        }
      }
    }
};
</script>