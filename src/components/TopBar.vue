<template>
  <nav :class="{ follow: isFollow }">
    <router-link to="/"> Home </router-link> |
    <router-link to="/about"> About </router-link> |
    <router-link to="/chat"> Chat </router-link> |
    <router-link to="/login"> Login </router-link>
  </nav>
</template>

<script>
export default {
  name: "SideBar",

  props: {
    follow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isFollow() {
      return this.follow;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

nav {
  padding: 30px;

  width: 100vw;
  background-color: theme-color(primary);
  box-sizing: border-box;
  padding: 20px;

  backdrop-filter: blur(10px);
}

nav a {
  font-weight: bold;
  color: theme-color(text);
}

nav a.router-link-exact-active {
  color: theme-color(background);
}

.content {
  flex: 1;
}

.follow {
  position: fixed;
}
</style>
