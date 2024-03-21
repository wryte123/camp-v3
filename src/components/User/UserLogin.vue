<template>
  <element id="login-panel">
    <div v-if="this.currentUser != null">
      <Avatar></Avatar>
      <p>user.name</p>
      <Button label="登出" @click="logout" />
    </div>
    <div v-else>
      <Button label="登入" @click="this.$router.push('/login')" />
    </div>
  </element>
</template>

<script>
import RegularButton from "../RegularButton.vue";

export default {
  components: {
    Button: RegularButton,
  },

  methods: {
    logout() {},
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
</style>
