<template>
  <element id="login-panel">
    <div v-if="currentUser.logined" class="user-login">
      <Avatar user="me" />
      <p>{{ currentUser.username }}</p>
      <Button label="登出" @click="logout" />
    </div>
    <div v-else>
      <Button label="登入" @click="$router.push('/login')" />
    </div>
  </element>
</template>

<script>
import RegularButton from "../RegularButton.vue";
import Avatar from "../Avatar.vue";
import { CurrentUser, logout } from "@/scripts/session.js";

export default {
  components: {
    Avatar,
    Button: RegularButton,
  },

  data() {
    return {
      currentUser: null,
    };
  },

  created() {
    this.currentUser = CurrentUser;
  },

  methods: {
    logout() {
      logout();
    },
  },
};
</script>

<style lang="scss" scoped>
#login-panel {
  display: flex;

  flex-direction: row;

  gap: 10px;

  justify-content: center;
  align-items: center;
}

.user-login {
  display: flex;
  flex-direction: row;
  gap: 10px;

  align-items: center;
}
</style>
