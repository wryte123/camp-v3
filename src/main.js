import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import Element from "element-plus";
import "element-plus/theme-chalk/index.css";

const app = createApp(App);
app.use(router);
app.use(Element);
app.mount("#app");
