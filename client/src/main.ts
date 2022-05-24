import { createApp } from "vue";
import router from "./router/index";
import { setupStore } from "@/store";
import "virtual:windi.css";
import "ant-design-vue/dist/antd.less";
import "./variable.less";
import App from "./App.vue";

async function bootstrap() {
  const app = createApp(App);
  app.use(router);

  // pinia 注册
  setupStore(app);

  await router.isReady();

  app.mount("#app", true);
}

void bootstrap();
