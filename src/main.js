// main.js
import { createApp } from "vue";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import store from "./store";
import router from "./router"; // 새로운 라우터 모듈을 가져옴

// Vuex store를 사용하여 애플리케이션을 생성하고 마운트
const app = createApp(App);
app.use(store); // Vuex store 등록
app.use(router); // 라우터 등록
app.use(VueCookies); // 쿠키 등록

app.mount("#app");
