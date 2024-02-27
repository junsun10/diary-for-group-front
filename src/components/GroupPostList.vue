<!-- GroupPostList.vue -->
<template>
  <div>
    <h2>그룹 일기 목록</h2>
    <div class="button-container">
      <div v-if="isGroupLeader">
        <GroupManagementButton :groupId="groupId" />
      </div>
      <div v-else>
        <button @click="confirmLeaveGroup" class="button">그룹 탈퇴</button>
      </div>
      <button @click="goToWritePost(groupId)" class="button">일기 작성</button>
    </div>
    <div>
      <div v-if="posts.length === 0">일기가 없습니다.</div>
      <table v-else class="post-table">
        <thead>
          <tr>
            <th class="title">제목</th>
            <th class="author">작성자</th>
            <th class="counts">조회</th>
            <th class="counts">댓글</th>
            <th class="counts">좋아요</th>
            <th class="counts">날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id" @click="goToPostDetail(post.id)">
            <td class="title">{{ post.title }}</td>
            <td class="author">{{ post.memberName }}</td>
            <td class="counts">{{ post.view }}</td>
            <td class="counts">{{ post.comments.length }}</td>
            <td class="counts">{{ post.likes.length }}</td>
            <td class="counts">{{ formatDate(post.createdDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import GroupManagementButton from '@/components/button/GroupManagementButton.vue';

export default {
  name: 'PostList',
  components: {
    GroupManagementButton
  },
  data() {
    return {
      isGroupLeader: false,
      posts: [],
      groupId: null,
      errorMessage: ''
    };
  },
  mounted() {
    this.groupId = this.$route.params.groupId;
    this.fetchPostList();
  },
  methods: {
    async fetchPostList() {
      try {
        const groupId = this.$route.params.groupId;
        const response = await axios.get(`http://localhost:8080/posts/my-group/${groupId}`, {
          withCredentials: true
        });
        this.posts = response.data;
        await this.checkIfGroupLeader();
      } catch (error) {
        console.error('Error fetching post list:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    async checkIfGroupLeader() {
      try {
        const response = await axios.get(`http://localhost:8080/groups/${this.groupId}`, {
          withCredentials: true
        });
        if (response.data.groupLeaderId === this.$store.state.userId) {
          this.isGroupLeader = true;
        }
      } catch (error) {
        console.error('Error checking if group leader:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    confirmLeaveGroup() {
      if (confirm("정말 그룹을 탈퇴하시겠습니까?")) {
        this.leaveGroup();
      }
    },
    async leaveGroup() {
      try {
        await axios.delete(`http://localhost:8080/group-member/${this.groupId}/remove`, {
          withCredentials: true
        });
        console.log('Group left successfully');
        this.$router.push('/main');
      } catch (error) {
        console.error('Error leaving group:', error);
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
    goToWritePost(groupId) {
      this.$router.push(`/post/write/${groupId}`);
    }
  }
}
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  margin: 10px;
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
.post-table {
  margin: 0 auto;
  border: 1px solid #ddd;
  width: 100%;
  border-collapse: collapse;
}
.post-table th {
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center;
  padding: 0.5em;
}
.post-table td {
  border: 1px solid #ddd;
  padding: 0.5em;
  cursor: pointer;
  text-align: center;
}
.post-table td.title {
  width: 50%;
  text-align: left;
}
.author {
  width: 10%;
}
.counts {
  width: 10%;
}
.error-message {
  color: red;
  font-size: 14px;
}
</style>
