<!-- GroupPostList.vue -->
<template>
    <div>
      <h2>그룹 일기 목록</h2>
      <!-- <div v-if="isGroupLeader">
        <GroupManagementButton :groupId="groupId" />
      </div>
      <button class="newPost" @click="goToWritePost(groupId)">일기 작성</button> -->
      <div class="button-container">
        <div v-if="isGroupLeader">
          <GroupManagementButton :groupId="groupId" />
        </div>
        <button class="newPost" @click="goToWritePost(groupId)">일기 작성</button>
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
        groupId: null
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
          const response = await axios.get(`http://localhost:8080/posts/my-group/${groupId}`,
          {
            withCredentials: true
          });
          this.posts = response.data;
          await this.checkIfGroupLeader();
        } catch (error) {
          console.error('Error fetching post list:', error);
        }
      },
      async checkIfGroupLeader() {
        try {
          // 서버로부터 그룹 리더 여부 확인하는 요청을 보내고 그에 대한 응답을 받음
          const response = await axios.get(`http://localhost:8080/groups/${this.groupId}`, {
            withCredentials: true
          });
          console.log(response.data, this.$store.state.userId);
          if (response.data.groupLeaderId === this.$store.state.userId) {
            this.isGroupLeader = true;
          }
        } catch (error) {
          console.error('Error checking if group leader:', error);
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
      goToWritePost(groupId) {
        // 일기 작성 페이지로 이동하는 메소드
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
.author {
  width: 10%;
  text-align: center;
}
.counts {
  width: 10%;
  text-align: center;
}
</style>