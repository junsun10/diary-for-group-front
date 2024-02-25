<!-- PostList.vue -->
<template>
  <div>
    <h2>일기 목록</h2>
    <button @click="goToWritePost">작성</button>
    <div>
      <div v-if="posts.length === 0">No posts available</div>
      <table v-else class="post-table">
        <thead>
          <tr>
            <th class="title">제목</th>
            <th class="counts">조회</th>
            <th class="counts">댓글</th>
            <th class="counts">좋아요</th>
            <th class="counts">날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id" @click="goToPostDetail(post.id)">
            <td class="title">{{ post.title }}</td>
            <td class="counts">{{ post.view }}</td>
            <td class="counts">{{ post.comments.length }}</td>
            <td class="counts">{{ post.likes.length }}</td>
            <td class="counts">{{ formatDate(post.createdDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostList',
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.fetchPostList();
  },
  methods: {
    async fetchPostList() {
      try {
        const response = await axios.get(`http://localhost:8080/posts/my`,
        {
          withCredentials: true
        });
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching post list:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    goToPostDetail(postId) {
      // 각 일기를 클릭할 때 해당 일기의 상세 페이지로 이동하는 메소드
      this.$router.push(`/post/${postId}`);
    },
    goToWritePost() {
      // 일기 작성 페이지로 이동하는 메소드
      this.$router.push('/write');
    }
  }
}
</script>

<style scoped>
.post-table {
  margin: 0 auto;
  border: 1px solid black;
}
.post-table th {
  border: 1px solid black;
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center;
}
.post-table td {
  border: 1px solid black;
  padding: 0.5em;
  cursor: pointer;
}
.title {
  width: 50%;
  text-align: left;
}
.counts {
  width: 10%;
  text-align: center;
}
</style>