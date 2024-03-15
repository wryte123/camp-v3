<script setup>
import { loginUser } from "../api/users";
import { reactive } from "vue";
import { ElMessage } from "element-plus";

const user = reactive({
  email: "",
  p: "",
});

const rules = {
  email: [
    { required: true, message: "请输入电子邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  p: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { pattern: /^\S{6,20}$/, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
  ],
};

const handleLogin = async () => {
  try {
    console.log(user);
    const response = await loginUser(user);
    const token = response.token;
    const userId = response.u_id;
    localStorage.setItem("token", token);
    ElMessage.success("登录成功");
    localStorage.setItem("userId", userId);
  } catch (error) {
    ElMessage.error("登录失败，请检查电子邮箱和密码");
  }

  return handleLogin;
};
</script>

<template>
  <div class="panel-wrapper">
    <el-card class="panel">
      <h1>登录</h1>
      <el-form
        class="login-panel"
        label-position="top"
        :model="user"
        :rules="rules"
      >
        <el-form-item
          label="Email"
          size="large"
          prop="email"
        >
          <el-input
            v-model="user.email"
            placeholder="E-mail"
          />
        </el-form-item>
        <el-form-item
          label="Password"
          size="large"
          prop="p"
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
          <el-button @click="$router.push({ name: 'register' })">
            注册
          </el-button>
          <el-button
            type="success"
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
