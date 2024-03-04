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
            <td class="postTitle">{{ post.title }}</td>
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
      <!-- 회원탈퇴 버튼 -->
      <button @click="confirmWithdrawal()" class="button">회원탈퇴</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
      errorMessage: ''
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
        const response = await axios.get(`/members/my-profile`,
        {
            withCredentials: true
        });
        this.user = response.data;
        console.log("user", this.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        this.errorMessage = error.response.data.message;
      }
    },
    async fetchPostList() {
      try {
        const response = await axios.get(`/posts/my`,
        {
          withCredentials: true
        });
        this.posts = response.data;
        console.log("posts", this.posts);
      } catch (error) {
        console.error('Error fetching post list:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    async fetchGroupList() {
      try {
        const response = await axios.get(`/groups/my`,
        {
          withCredentials: true
        });
        this.groups = response.data;
        console.log("groups", this.groups);
      } catch (error) {
        console.error('Error fetching group list:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    async fetchCommentList() {
      try {
        const response = await axios.get(`/comments/my`,
        {
          withCredentials: true
        });
        this.comments = response.data;
        console.log("comments", this.comments);
      } catch (error) {
        console.error('Error fetching comment list:', error);
        this.errorMessage = error.response.data.message;
      }
    },

    async confirmWithdrawal() {
      if (confirm('정말로 회원탈퇴를 하시겠습니까?')) {
        this.withdrawal();
      }
    },
    async withdrawal() {
      try {
        const response = await axios.delete(`/members/remove`,
        {
          withCredentials: true
        });
        if (response.status === 200) {
          // 회원탈퇴 성공
          console.log('회원탈퇴 성공:', response.data);
          // 로그아웃 후 홈페이지로 이동 또는 필요에 따라 다른 동작 수행
          this.$store.commit('logout');
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error withdrawing:', error);
        this.errorMessage = error.response.data.message;
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
  cursor: pointer;
}
.postTitle {
  text-align: left;
}

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
.error-message {
  color: red;
  font-size: 14px;
}
</style>
