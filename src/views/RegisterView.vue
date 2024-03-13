<script setup>
import { reactive } from "vue";

const user = reactive({
  email: "",
  username: "",
  p: "",
  vp: "",
});


const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 20,
      message: "用户名长度在 3 到 20 个字符",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "请输入电子邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  p: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
  ],
  vp: [{ validator: validatePass, trigger: "blur" }],
};

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== user.p) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

// const handleReg = async () => {
//   return {
//     user,
//     rules,
//   };
// };
</script>

<template>
  <div class="panel-wrapper">
    <el-card class="panel">
      <h1>注册</h1>
      <el-form class="register-panel" label-position="top" :rules="rules">
        <el-form-item label="用户名" size="large" prop="username">
          <el-input v-model="user.username" placeholder="Username" />
        </el-form-item>
        <el-form-item label="电子邮件" size="large" prop="email">
          <el-input v-model="user.email" placeholder="E-mail" />
        </el-form-item>
        <el-form-item label="密码" size="large" prop="p">
          <el-input
            v-model="user.p"
            placeholder="Password"
            show-password
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码" size="large" prop="vp">
          <el-input
            v-model="user.vp"
            placeholder="Confirmed"
            show-password
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.push({ name: 'login' })">
            返回登陆
          </el-button>
          <el-button @click="handleReg" type="success">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss">
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
