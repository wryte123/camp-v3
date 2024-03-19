<script setup>
import { reactive } from "vue";
import { registerUser } from "../api/users";

const rulesForm = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const user = reactive({
  username: "",
  email: "",
  p: "",
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入电子邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 20, message: "密码长度在 6 到 20 个字符", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      validator: valipassword,
      message: "两次输入密码不一致",
      trigger: "blur",
    },
  ],
});

function valipassword(rule, values, callback) {
  if (values !== rulesForm.password) {
    callback(new Error("两次输入密码不一致"));
  } else {
    callback();
  }
}

const handleRegister = async () => {
  try {console.log(rulesForm);
  user.username = rulesForm.username;
  user.email = rulesForm.email;
  user.p = rulesForm.password;
  const response = await registerUser(user);
  console.log(response);
  const token = response.token;
  const userId = response.u_id;
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);}
  catch (error) {
    console.log(error);
  }
};

</script>

<template>
  <div class="panel-wrapper">
    <el-card class="panel">
      <h1>注册</h1>
      <el-form
        class="reg-panel"
        label-position="top"
        :rules="rules"
        :model="rulesForm"
      >
        <el-form-item
          label="用户名"
          size="large"
          prop="username"
        >
          <el-input
            v-model="rulesForm.username"
            placeholder="username"
          />
        </el-form-item>
        <el-form-item
          label="Email"
          size="large"
          prop="email"
        >
          <el-input
            v-model="rulesForm.email"
            placeholder="E-mail"
          />
        </el-form-item>
        <el-form-item
          label="Password"
          size="large"
          prop="password"
        >
          <el-input
            v-model="rulesForm.password"
            placeholder="Password"
            show-password
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          size="large"
          prop="confirmPassword"
        >
          <el-input
            v-model="rulesForm.confirmPassword"
            placeholder="Confirm Password"
            show-password
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item class="reg-btn">
          <el-button @click="$router.push({ name: 'login' })">
            返回登录
          </el-button>
          <el-button
            type="primary"
            @click="handleRegister"
          >
            注册
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
