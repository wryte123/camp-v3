import { createApp } from "vue";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import Element from "element-plus";
import "element-plus/theme-chalk/index.css";
import "./styles/el.scss";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import requestService from "./scripts/Requests.js";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(Element);
app.component("MdPreview", MdPreview);

// 在这里设置 Vue 原型属性
Vue.prototype.instance = requestService;

app.mount("#app");
