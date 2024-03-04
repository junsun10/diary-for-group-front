// store/index.js
import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";

export default createStore({
  state: {
    isLoggedIn: false,
    userId: null,
    userName: null,
  },
  mutations: {
    login(state, { userId, userName }) {
      state.isLoggedIn = true;
      state.userId = userId;
      state.userName = userName;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
      state.userName = null;
    },
  },
  actions: {
    login({ commit }, userId, userName) {
      // 여기서는 실제로 서버와 통신하여 로그인을 처리하는 로직을 작성할 수 있습니다.
      // 성공 시에는 commit을 사용하여 상태를 변경합니다.
      commit("login", userId, userName);
    },
    logout({ commit }) {
      // 로그아웃 시에는 단순히 상태를 변경합니다.
      commit("logout");
    },
    async checkLoginStatus({ commit }) {
      try {
        const response = await axios.get(`/members/login-status`, {
          withCredentials: true,
        });
        // 성공적으로 로그인된 상태라면 commit을 사용하여 상태를 갱신합니다.
        commit("login", {
          userId: response.data.id,
          userName: response.data.name,
        });
      } catch (error) {
        console.error("Error checking login status:", error);
        // 로그인 상태 확인에 실패한 경우에 대한 처리
        router.push("/login");
      }
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    userId: (state) => state.userId,
    userName: (state) => state.userName,
  },
});
