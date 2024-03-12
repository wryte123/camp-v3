<script setup>
import { loginUser } from "../api/users";
import { reactive } from "vue";
import { ElMessage } from "element-plus";

const user = reactive({
  email: "",
  p: "",
});

const rules = {
  email: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  p: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const handleLogin = async () => {
  try {
    console.log(user);
    const response = await loginUser(user);
    const token = response.token;
    localStorage.setItem("token", token);
    ElMessage.success("登录成功");
  } catch (error) {
    ElMessage.error("登录失败，请检查用户名和密码");
  }

  return {
    user,
    rules,
    handleLogin,
  };
};
</script>

<template>
  <div class="panel-wrapper">
    <el-card class="panel">
      <h1>登录</h1>
      <el-form
        class="login-panel"
        label-position="top"
      >
        <el-form-item
          label="Email"
          size="large"
        >
          <el-input
            v-model="user.email"
            placeholder="E-mail"
          />
        </el-form-item>
        <el-form-item
          label="Password"
          size="large"
        >
          <el-input
            v-model="user.p"
            placeholder="Password"
            show-password
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="info">
            注册
          </el-button>
          <el-button
            type="warning"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

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
