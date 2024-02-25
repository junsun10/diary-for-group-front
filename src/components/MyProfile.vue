<!-- MyProfile.vue -->
<template>
  <div>
    <h2>내 정보</h2>
    <div v-if="user">
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>이메일</th>
            <th>가입일</th>
          </tr>
        </thead>
        <tbody>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ formatDate(user.createdDate) }}</td>
        </tbody>
      </table>

      <h2>내 일기</h2>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>그룹</th>
            <th>생성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id" @click="goToPostDetail(post.id)">
            <td>{{ post.title }}</td>
            <td>{{ post.groupName }}</td>
            <td>{{ formatDate(post.createdDate) }}</td>
          </tr>
        </tbody>
      </table>

      <h2>내 댓글</h2>
      <table>
        <thead>
          <tr>
            <th>댓글</th>
            <th>생성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in comments" :key="comment.id" @click="goToPostDetail(comment.postId)">
            <td>{{ comment.body }}</td>
            <td>{{ formatDate(comment.createdDate) }}</td>
          </tr>
        </tbody>
      </table>

      <h2>내 그룹</h2>
      <table>
        <thead>
          <tr>
            <th>그룹명</th>
            <th>그룹원</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groups" :key="group.id" @click="goToGroupPostList(group.id)">
            <td>{{ group.name }}</td>
            <td>{{ group.groupMembersName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
      user: null,
      groups: [],
      posts: [],
      comments: [],
      };
  },
  mounted() {
    // 페이지가 마운트되면 사용자 정보를 가져옵니다.
    this.fetchUserData();
    this.fetchPostList();
    this.fetchGroupList();
    this.fetchCommentList();
  },
  methods: {
    async fetchUserData() {
      try {
        // API를 호출하여 사용자 정보를 가져옵니다.
        const response = await axios.get("http://localhost:8080/members/my-profile",
        {
            withCredentials: true
        });
        this.user = response.data;
        console.log("user", this.user);
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
    },
    async fetchPostList() {
      try {
        const response = await axios.get(`http://localhost:8080/posts/my`,
        {
          withCredentials: true
        });
        this.posts = response.data;
        console.log("posts", this.posts);
      } catch (error) {
        console.error('Error fetching post list:', error);
      }
    },
    async fetchGroupList() {
      try {
        const response = await axios.get(`http://localhost:8080/groups/my`,
        {
          withCredentials: true
        });
        this.groups = response.data;
        console.log("groups", this.groups);
      } catch (error) {
        console.error('Error fetching group list:', error);
      }
    },
    async fetchCommentList() {
      try {
        const response = await axios.get(`http://localhost:8080/comments/my`,
        {
          withCredentials: true
        });
        this.comments = response.data;
        console.log("comments", this.comments);
      } catch (error) {
        console.error('Error fetching comment list:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    goToPostDetail(postId) {
      this.$router.push(`/post/${postId}`);
    },
    goToGroupPostList(groupId) {
      this.$router.push(`/group/${groupId}`);
    },
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  padding: 8px;
  border: 1px solid #ddd;
}

td {
  padding: 8px;
  border: 1px solid #ddd;
}
</style>
