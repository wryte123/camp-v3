<template>
  <div class="panel-wrapper">
    <el-card class="panel">
      <h1>登录</h1>
      <el-form class="login-panel" label-position="top">
        <el-form-item label="Username" size="large">
          <el-input v-model="user.username" placeholder="Username" />
        </el-form-item>
        <el-form-item label="Password" size="large">
          <el-input
            v-model="user.password"
            placeholder="Password"
            show-password
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="info">重置</el-button>
          <el-button type="warning" @click="handelLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
// import { ElMessage } from "element-plus";
// import { reactive } from "vue";

// const user = reactive({
//   username: "",
//   password: "",
// });

// const rules= {
//   username: [
//     { required: true, message: "请输入用户名", trigger: "blur" },
//   ],
//   password: [
//     { required: true, message: "请输入密码", trigger: "blur" },
//   ],
// };

// const handelLogin = async () => {
//   try {
//     const response = await loginUser();
//     console.log(response);
//   } catch (error) {
//     ElMessage.error("登录失败");
//   }
// }
</script>

<style lang="scss" scoped>
.panel-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .panel {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
  }
}
</style>
