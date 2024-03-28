<template>
  <main>
    <Bar follow />
    <section id="options-main">
      <p>Users / me</p>
      <h1>用户设置</h1>
      <div id="my-info">
        <div id="avatar-info">
          <el-avatar :size="200" />
          <Button />
        </div>
        <el-form :model="user" label-width="auto" id="user-info-form">
          <el-form-item label="用户名">
            <el-input v-model="user.name" />
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
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="user"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="Password" prop="pass">
          <el-input v-model="user.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input
            v-model="user.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-input v-model.number="user.age" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Submit</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </section>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import RegularButton from "@/components/RegularButton.vue";

export default {
  components: {
    Bar: SideBar,
    Button: RegularButton,
  },

  data() {
    return {
      user: {
        name: "me",
        email: "",
      },
    };
  },

  methods: {
    myInfo() {},
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

main {
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
}

#options-main {
  width: 80%;
  min-height: 100vh;
  padding: 50px 100px;
  margin-left: 100px;

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
