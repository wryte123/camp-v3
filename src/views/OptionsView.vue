<template>
  <main>
    <Bar />
    <section id="options-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a @click="this.$router.push('/')">Campfire</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a @click="this.$router.push('/')">用户</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ user.username }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>用户设置</h1>
      <div id="my-info">
        <div id="avatar-info">
          <el-avatar :size="200" :src="myAvatar" />
          <Button label="上传" @click="uploadAvatar" />
        </div>
        <el-form id="user-info-form" :model="user" label-width="auto">
          <el-form-item label="用户名">
            <el-input v-model="user.username" />
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="user.sex" placeholder="选择性别">
              <el-option label="男" value="male" />
              <el-option label="女" value="famale" />
              <el-option label="保密" value="unknown" />
            </el-select>
          </el-form-item>
          <el-form-item label="个人介绍">
            <el-input v-model="user.signature" type="textarea" />
          </el-form-item>
          <el-form-item>
            <Button label="确认" @click="onSubmit" />
          </el-form-item>
        </el-form>
      </div>
    </section>
    <input
      type="file"
      name="imageToUpload"
      hidden
      ref="imageUploader"
      accept="image/*"
      @change="handleAvatarUpload($event)"
    />
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import RegularButton from "@/components/RegularButton.vue";
import { UserAPI, FileAPI } from "@/scripts/api.js";
import { ElMessage } from "element-plus";

export default {
  components: {
    Bar: SideBar,
    Button: RegularButton,
  },

  data() {
    return {
      user: {},
    };
  },

  created() {
    this.fetchUserInfo();
  },

  computed: {
    myAvatar() {
      return FileAPI.getMyAvatar();
    },
  },

  methods: {
    fetchUserInfo() {
      UserAPI.myInfo()
        .then((response) => {
          this.user = response.data;
          console.log(response);
        })
        .catch(() => {
          ElMessage.error("用户信息获取失败！");
          this.$router.back();
        });
    },

    uploadAvatar() {
      this.$refs.imageUploader.click();
    },

    handleAvatarUpload(event) {
      const avatar = event.target.files[0];
      if (!avatar) return;

      const reader = new FileReader();
      reader.onload = () => {
        UserAPI.uploadUserAvatar(avatar)
          .then(() => {
            ElMessage.success("头像上传成功");
            this.user.avatarBase64 = reader.result;
          })
          .catch((error) => {
            ElMessage.error("头像上传失败");
            console.log(error);
          });
      };
      reader.readAsDataURL(avatar);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

main {
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
}

#options-main {
  width: 100%;
  height: 100%;
  padding: 50px 100px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 50px;
  align-items: flex-start;

  h1 {
    font-size: 48px;
  }

  #my-info {
    display: flex;
    flex-direction: row;
    gap: 40px;

    #avatar-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    #user-info {
      display: flex;
      flex-direction: column;

      align-items: flex-start;

      box-sizing: border-box;
      padding: 20px;

      gap: 10px;

      * {
        margin: 0;
      }
    }

    .editable {
      display: flex;
      flex-direction: row;

      gap: 10px;
      align-items: center;
    }
  }

  #user-info-form {
    width: 60%;
  }
}
</style>
