// router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";
import BesforeLogin from "@/components/BeforeLogin.vue";
import Login from "@/components/Login.vue";
import SignUp from "@/components/SignUp.vue";
import Main from "@/components/Main.vue";
import MyProfile from "@/components/MyProfile.vue";

import PostList from "@/components/PostList.vue";
import PostDetail from "@/components/PostDetail.vue";
import PostWrite from "@/components/PostWrite.vue";
import PostEdit from "@/components/PostEdit.vue";

import MyGroupList from "@/components/MyGroupList.vue";
import GroupPostList from "@/components/GroupPostList.vue";
import GroupCreate from "@/components/GroupCreate.vue";
import GroupJoin from "@/components/GroupJoin.vue";
import GroupManagement from "@/components/GroupManagement.vue";

const routes = [
  { path: "/", redirect: "/before-login" },
  { path: "/before-login", component: BesforeLogin },
  { path: "/login", component: Login },
  { path: "/sign-up", component: SignUp },
  {
    path: "/main",
    component: Main,
    meta: { requiresAuth: true }, // 인증이 필요한 페이지
  },

  {
    path: "/my-profile",
    component: MyProfile,
    meta: { requiresAuth: true },
  },

  {
    path: "/my-group-list",
    component: MyGroupList,
    meta: { requiresAuth: true },
  },
  {
    path: "/group/create",
    component: GroupCreate,
    meta: { requiresAuth: true },
  },
  {
    path: "/group/join",
    component: GroupJoin,
    meta: { requiresAuth: true },
  },
  {
    path: "/group/:groupId/management",
    component: GroupManagement,
    meta: { requiresAuth: true },
  },
  {
    path: "/group/:groupId",
    component: GroupPostList,
    meta: { requiresAuth: true },
  },

  {
    path: "/post",
    component: PostList,
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:postId",
    component: PostDetail,
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:postId/edit",
    component: PostEdit,
    meta: { requiresAuth: true },
  },
  {
    path: "/post/write/:groupId",
    component: PostWrite,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 네비게이션 가드 설정
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 인증이 필요한 페이지인 경우
    if (!store.state.isLoggedIn) {
      await store.dispatch("checkLoginStatus");
    }
    if (!store.state.isLoggedIn) {
      // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
      next("/login");
    } else {
      next(); // 그렇지 않으면 진행
    }
  } else {
    next(); // 인증이 필요하지 않은 페이지면 진행
  }
});

export default router;
