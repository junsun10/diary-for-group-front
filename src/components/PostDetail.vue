<!-- PostDetail.vue -->
<template>
    <div>
        <div v-if="post" class="post-detail-container">
            <div class="post-detail-header">
                <div>
                    <h3>{{ post.title }}</h3>
                </div>
                <div class="post-metadata">
                    <p>{{ formatDate(post.createdDate) }}</p>
                    <p>작성자: {{ post.memberName }}</p>
                    <p>조회: {{ post.view }}</p>
                    <p>댓글: {{ comments.length }}</p>
                    <p>
                        <button @click="toggleLike" :class="{ 'liked': like }">
                            {{ like ? '좋아요 취소' : '좋아요' }}
                        </button>
                            : {{ likes.length }}
                    </p>
                </div>
            </div>
            <div class="post-body" v-html="formatBody(post.body)"></div>
            <div class="comments-box">
                <h3>댓글</h3>
                <table v-if="comments.length > 0" class="comment-table">
                    <thead>
                        <tr>
                            <th class="info">작성자</th>
                            <th class="content">내용</th>
                            <th class="info">작성일</th>
                            <th class="actions">작업</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="comment in comments" :key="comment.id">
                        <td class="info">{{ comment.memberName }}</td>
                        <!-- 수정 버튼을 누르면 수정 모드로 전환 -->
                        <td class="content">
                          <span v-if="comment.editing">
                            <!-- 수정 중일 때는 입력 폼을 표시 -->
                            <textarea v-model="comment.newBody" required></textarea>
                          </span>
                          <span v-else>
                            <!-- 수정 중이 아닐 때는 댓글 내용을 표시 -->
                            {{ comment.body }}
                          </span>
                        </td>
                        <td class="info">{{ formatDate(comment.createdDate) }}</td>
                        <td class="actions" v-if="isCommentAuthor(comment.memberName)">
                          <button v-if="comment.editing" @click="saveCommentEdit(comment.id)">저장</button>
                          <button v-else @click="startCommentEdit(comment)">수정</button>
                          <button @click="confirmDeleteComment(comment.id)">삭제</button>
                        </td>
                      </tr>
                    </tbody>
                </table>
                <div v-else>
                    <p>댓글이 없습니다.</p>
                </div>

                <!-- Comment Form -->
                <form @submit.prevent="submitComment">
                    <div class="newComment">
                        <label for="commentContent">댓글 작성</label>
                        <textarea id="commentContent" v-model="newCommentContent" required></textarea>
                    </div>
                    <button type="submit">작성</button>
                </form>
            </div>
            <div v-if="isAuthor" class="post-actions">
                <button @click="editPost">수정</button>
                <button @click="confirmDeletePost()">삭제</button>
            </div>
        </div>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'PostDetail',
  data() {
    return {
      post: null,
      comments: [],
      likes: [],
      like: null,
      newCommentContent: '',
      errorMessage: ''
    };
  },
  mounted() {
    this.fetchPostDetail(),
    this.fetchCommentDetail(),
    this.fetchPostLikeDetail(),
    this.fetchMyPostLikeDetail()
  },
  computed: {
    isAuthor() {
      console.log(this.post.memberName,this.$store.state.userName);
      return this.post && this.post.memberName == this.$store.state.userName;
    },
  },
  methods: {
    async fetchPostDetail() {
      try {
        const postId = this.$route.params.postId;
        const [postResponse] = await Promise.all([
          axios.get(`/posts/${postId}`,
          {
            withCredentials: true
          })
        ]);
        this.post = postResponse.data;
        console.log(this.post);
      } catch (error) {
        console.error('Error fetching post detail:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    async fetchCommentDetail() {
      try {
        const postId = this.$route.params.postId;
        const [commentsResponse] = await Promise.all([
          axios.get(`/comments/post/${postId}`,
          {
            withCredentials: true
          })
        ]);
        this.comments = commentsResponse.data;
      } catch (error) {
        console.error('Error fetching comment detail:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    async fetchPostLikeDetail() {
      try {
        const postId = this.$route.params.postId;
        const [likesResponse] = await Promise.all([
          axios.get(`/post-likes/post/${postId}`,
          {
            withCredentials: true
          })
        ]);
        this.likes = likesResponse.data;
      } catch (error) {
        console.error('Error fetching post like detail:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    async fetchMyPostLikeDetail() {
      try {
        const postId = this.$route.params.postId;
        const [likeResponse] = await Promise.all([
            axios.get(`/post-likes/my-status/post/${postId}`,
          {
            withCredentials: true
          })
        ]);
        this.like = likeResponse.data;
        console.log("my post like",this.like);
      } catch (error) {
        console.error('Error fetching post like detail:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    async toggleLike() {
        try {
          const postId = this.$route.params.postId;
            if (this.like) {
                // Unlike the post
                const response = await axios.delete(`/post-likes/post/${postId}`,
                  {
                    withCredentials: true
                  }
                );
                console.log(response.data);
            } else {
              console.log(this.post.id,"post like");
                // Like the post
                const response = await axios.post(`/post-likes`,
                  {
                    postId: this.post.id
                  },
                  {
                    withCredentials: true
                  }
                );
                console.log(response.data);
            }
            await this.fetchPostLikeDetail();
            await this.fetchMyPostLikeDetail();
        } catch (error) {
            console.error('Error toggling like:', error);
            this.errorMessage = error.response.data.message;
        }
    },
    isCommentAuthor(commentAuthor) {
      console.log(commentAuthor,this.$store.state.userName);
      return commentAuthor === this.$store.state.userName;
    },
    async submitComment() {
      try {
        const postId = this.$route.params.postId;
        await axios.post(`/comments/new`, {
            postId: postId,
            body: this.newCommentContent
        },
          {
            withCredentials: true
          });
        // 댓글 작성 후, 댓글 목록을 다시 불러옵니다.
        await this.fetchCommentDetail();
        // 댓글 작성 폼 비우기
        this.newCommentContent = '';
      } catch (error) {
        console.error('Error submitting comment:', error);
        this.errorMessage = error.response.data.message;
      }
    },

    startCommentEdit(comment) {
      // 수정 모드로 전환
      comment.editing = true;
      // 수정 중인 내용을 현재 내용으로 초기화
      comment.newBody = comment.body;
    },
    async saveCommentEdit(commentId) {
      try {
        const comment = this.comments.find(comment => comment.id === commentId);
        // 수정된 내용을 서버에 저장
        await axios.post(`/comments/${commentId}/edit`, {
          id: commentId,
          body: comment.newBody
        },
        {
          withCredentials: true
        });
        // 수정이 완료되면 수정 모드를 해제하고 댓글을 다시 불러옴
        comment.editing = false;
        await this.fetchCommentDetail();
      } catch (error) {
        console.error('Error saving comment edit:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    async confirmDeleteComment(commentId) {
        // 확인 팝업을 띄웁니다.
        if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            await this.deleteComment(commentId);
        }
    },

    async deleteComment(commentId) {
      try {
        await axios.delete(`/comments/${commentId}/remove`, {
            withCredentials: true
        });
        // 댓글 삭제 후, 댓글 목록을 다시 불러옵니다.
        await this.fetchCommentDetail();
      } catch (error) {
        console.error('Error deleting comment:', error);
        this.errorMessage = error.response.data.message;
      }
    },

    editPost() {
      // 현재 포스트의 ID를 이용해 편집 페이지로 이동합니다.
      this.$router.push(`/post/${this.post.id}/edit`);
    },
    async confirmDeletePost() {
        // 확인 팝업을 띄웁니다.
        if (confirm("정말로 이 일기를 삭제하시겠습니까?")) {
            await this.deletePost();
        }
    },
    async deletePost() {
      try {
        const postId = this.$route.params.postId;
        await axios.delete(`/posts/${postId}/remove`,
          {
            withCredentials: true
          });
        // 포스트 삭제 후, 이전 페이지로 이동합니다.
        this.$router.push('/main');
      } catch (error) {
        console.error('Error deleting post:', error);
        this.errorMessage = error.response.data.message;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    formatBody(body) {
      return body.split('\n').join('<br>');
    }
  }
};
</script>
  
<style scoped>
.post-detail-container {
  border: 1px solid #ccc;
  width: 90%; /* 너비를 줄임 */
  margin: 20px auto; /* 중앙 정렬 및 상하 여백 추가 */
  padding: 10px;
}

.post-detail-header {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; /* 헤더와 바디 사이에 간격 추가 */
}

.post-body {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px; /* 바디 아래 여백 추가 */
  text-align: justify;
  border-radius: 5px; /* 테두리를 부드럽게 만듦 */
  line-height: 2;
}

.post-metadata {
  text-align: right;
}

.comments-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0; /* 위쪽 여백 추가 */
}

.comment-table {
  width: 100%;
  border-collapse: collapse;
}

.comment-table th,
.comment-table td {
  border: 1px solid #ddd;
  padding: 10px; /* 셀 내부 여백 수정 */
  text-align: left;
}

.comment-table th {
  background-color: #f2f2f2;
}

.comment .actions button {
  margin-right: 5px; /* 버튼 사이 여백 추가 */
}

.content {
  width: 50%;
}
.newComment {
  display: flex;
  justify-content: flex-end; /* 내용을 오른쪽으로 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  margin: 10px 0; /* 아래쪽 여백 추가 */
  /* border: 1px solid #ccc; */

}

.newComment label {
  margin: 0 10px; /* 레이블과 입력창 사이의 간격 설정 */
  font-weight: bold;
}

.newComment textarea {
  flex: 1; /* 나머지 공간을 모두 차지하도록 함 */
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}


textarea {
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #a8aaac;
  color: white;
}
.error-message {
  color: red;
  font-size: 14px;
}

</style>