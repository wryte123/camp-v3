<template>
  <main class="about">
    <Bar />
    <h1>This is an about page</h1>
    <div>
      <el-button @click="showMessage"> Click me </el-button>
    </div>
  </main>
</template>

<script>
import { ElMessage } from "element-plus";
import TopBar from "@/components/TopBar.vue";

export default {
  components: {
    Bar: TopBar,
  },

  methods: {
    showMessage() {
      ElMessage("Hello, Element Plus!");
    },
  },
};
</script>

<style>
main {
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
}
</style>
