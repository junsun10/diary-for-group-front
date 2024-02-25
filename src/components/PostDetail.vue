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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="comment in comments" :key="comment.id">
                            <td class="info">{{ comment.memberName }}</td>
                            <td class="content">{{ comment.body }}</td>
                            <td class="info">{{ formatDate(comment.createdDate) }}</td>
                        </tr>
                    </tbody>
                </table>
                <div v-else>
                    <p>댓글이 없습니다.</p>
                </div>

                <!-- Comment Form -->
                <form @submit.prevent="submitComment">
                    <div>
                        <label for="commentContent">댓글 작성:</label>
                        <textarea id="commentContent" v-model="newCommentContent" required></textarea>
                    </div>
                    <button type="submit">작성</button>
                </form>
            </div>
            <div v-if="isAuthor" class="post-actions">
                <button @click="editPost">수정</button>
                <button @click="deletePost">삭제</button>
            </div>
        </div>
    </div>
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
      newCommentContent: ''
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
    }
  },
  methods: {
    async fetchPostDetail() {
      try {
        const postId = this.$route.params.postId;
        const [postResponse] = await Promise.all([
          axios.get(`http://localhost:8080/posts/${postId}`,
          {
            withCredentials: true
          })
        ]);
        this.post = postResponse.data;
        console.log(this.post);
      } catch (error) {
        console.error('Error fetching post detail:', error);
      }
    },
    async fetchCommentDetail() {
      try {
        const postId = this.$route.params.postId;
        const [commentsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/comments/post/${postId}`,
          {
            withCredentials: true
          })
        ]);
        this.comments = commentsResponse.data;
      } catch (error) {
        console.error('Error fetching comment detail:', error);
      }
    },
    async fetchPostLikeDetail() {
      try {
        const postId = this.$route.params.postId;
        const [likesResponse] = await Promise.all([
          axios.get(`http://localhost:8080/post-likes/post/${postId}`,
          {
            withCredentials: true
          })
        ]);
        this.likes = likesResponse.data;
      } catch (error) {
        console.error('Error fetching post like detail:', error);
      }
    },
    async fetchMyPostLikeDetail() {
      try {
        const postId = this.$route.params.postId;
        const [likeResponse] = await Promise.all([
            axios.get(`http://localhost:8080/post-likes/my-status/post/${postId}`,
          {
            withCredentials: true
          })
        ]);
        this.like = likeResponse.data;
        console.log("my post like",this.like);
      } catch (error) {
        console.error('Error fetching post like detail:', error);
      }
    },
    async toggleLike() {
        try {
          const postId = this.$route.params.postId;
            if (this.like) {
                // Unlike the post
                const response = await axios.delete(`http://localhost:8080/post-likes/post/${postId}`,
                  {
                    withCredentials: true
                  }
                );
                console.log(response.data);
            } else {
              console.log(this.post.id,"post like");
                // Like the post
                const response = await axios.post(`http://localhost:8080/post-likes`,
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
        }
    },
    async submitComment() {
      try {
        const postId = this.$route.params.postId;
        await axios.post(`http://localhost:8080/comments/new`, {
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
      }
    },
    editPost() {
      // 현재 포스트의 ID를 이용해 편집 페이지로 이동합니다.
      this.$router.push(`/post/${this.post.id}/edit`);
    },
    async deletePost() {
      try {
        const postId = this.$route.params.postId;
        await axios.delete(`http://localhost:8080/posts/${postId}/remove`,
          {
            withCredentials: true
          });
        // 포스트 삭제 후, 이전 페이지로 이동합니다.
        this.$router.push('/main');
      } catch (error) {
        console.error('Error deleting post:', error);
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
  width: 80%;
  margin: 0 auto;
  padding: 0 10px 5px 10px;
}

.post-detail-header {
  justify-content: space-between;
  align-items: center;
}
.post-body {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    text-align: justify;
}
.post-metadata {
  text-align: right;
}
.liked {
    color: red; /* Change the color to red when liked */
}
.comments-box {
    border: 1px solid #ccc;
    padding: 10px;
}
.comment {
    border: 1px solid #ccc;
    margin: 10px 0;
}
.comment-table {
    width: 100%;
    border-collapse: collapse;
}
.comment-table th, .comment-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
.comment-table th {
    background-color: #f2f2f2;
}
.content {
  width: 50%;
}
.info {
  width: 20%;
}
</style>