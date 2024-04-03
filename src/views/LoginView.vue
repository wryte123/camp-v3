<template>
  <main id="login-wrapper">
    <section id="login-main">
      <div id="login-view">
        <div class="back" @click="$router.push('/')">
          <ArrowLeftBold class="nav-icon" />
          返回
        </div>
        <img src="@/assets/login_view.jpg" />
      </div>
      <div id="login-panel">
        <el-tabs>
          <el-tab-pane label="登录">
            <el-form
              class="login-panel"
              label-position="top"
              :model="loginForm"
              :rules="loginRules"
            >
              <el-form-item label="账号" size="large" prop="email">
                <el-input v-model="loginForm.email" placeholder="输入邮箱..." />
              </el-form-item>
              <el-form-item label="密码" size="large" prop="password">
                <el-input
                  v-model="loginForm.password"
                  placeholder="输入密码..."
                  show-password
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item>
                <Button label="登录" colored @click="handleLogin" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册">
            <el-form
              class="login-panel"
              label-position="top"
              :model="registerForm"
              :rules="registerRules"
            >
              <el-form-item label="邮箱" size="large" prop="email">
                <el-input
                  v-model="registerForm.email"
                  placeholder="输入邮箱..."
                />
              </el-form-item>
              <el-form-item label="昵称" size="large" prop="username">
                <el-input
                  v-model="registerForm.username"
                  placeholder="输入昵称..."
                />
              </el-form-item>
              <el-form-item label="密码" size="large" prop="password">
                <el-input
                  v-model="registerForm.password"
                  placeholder="输入密码..."
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
                  v-model="registerForm.confirmPassword"
                  placeholder="确认密码..."
                  show-password
                  type="password"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item>
                <Button label="注册" colored @click="handleRegister" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </section>
  </main>
</template>

<script>
import { ElMessage } from "element-plus";
import RegularButton from "@/components/RegularButton.vue";
import { LoginAPI } from "@/scripts/api";
import { userInit } from "@/scripts/session";

export default {
  components: {
    Button: RegularButton,
  },

  data() {
    return {
      rules: {
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\S{6,20}$/,
            message: "密码长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: this.validatePasswordConfirm, trigger: "blur" },
        ],
      },
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },

  methods: {
    handleLogin() {
      const user = this.loginForm;
      console.log(user);
      LoginAPI.login(user)
        .then((response) => {
          localStorage.setItem("token", response.data.id);
          localStorage.setItem("userId", response.data.token);
          userInit(
            response.data.id,
            response.data.name,
            response.data.avatarUrl,
            response.data.token
          );
          ElMessage.success("登录成功");
          console.log(response);
          setTimeout(() => {
            this.$router.push("/chat");
          }, 1000);
        })
        .catch((error) => {
          ElMessage.error("登录失败，请检查电子邮箱和密码");
          console.log(error);
        });
    },

    handleRegister() {
      const user = this.registerForm;
      console.log(user);
      LoginAPI.register(user)
        .then((response) => {
          ElMessage.success("注册成功");
          console.log(response);
        })
        .catch((error) => {
          if (error.code == 400) {
            ElMessage.error("注册失败，请检查电子邮箱和密码");
          } else {
            ElMessage.error("服务器错误");
          }
        });
    },

    validatePasswordConfirm(rule, value, callback) {
      if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

#login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  #login-main {
    height: 600px;
    width: 800px;
    border: 1px solid theme-color(border);
    border-radius: 30px;

    display: flex;
    flex-direction: row;

    box-shadow: 3px 3px 5px 3px theme-color(border);

    #login-view {
      height: 100%;
      width: 40%;

      img {
        height: 100%;
        width: 100%;
        border-radius: 30px 0px 0px 30px;
      }
    }

    #login-panel {
      height: 100%;
      width: 60%;

      box-sizing: border-box;
      padding: 10% 30px;
    }
  }
}

.back {
  margin-left: 8px;
  margin-top: 10px;
  position: absolute;

  color: white;

  display: flex;
  flex-direction: row;

  align-items: center;

  cursor: pointer;
}
</style>
