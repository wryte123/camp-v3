import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import Element from "element-plus";
import "element-plus/theme-chalk/index.css";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

const app = createApp(App);
app.use(router);
app.use(Element);
app.use("MdPreview", MdPreview);
app.mount("#app");
