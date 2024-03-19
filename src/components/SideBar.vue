<template>
  <aside class="sidebar" :class="{ follow: isFollow }">
    <router-link to="/"> Home </router-link>
    <router-link to="/about"> About </router-link>
    <router-link to="/chat"> Chat </router-link>
    <router-link to="/login"> Login </router-link>
  </aside>
</template>

<script>
export default {
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

.sidebar {
  height: 100%;
  width: 100%;

  background-color: theme-color(primary);
  box-sizing: border-box;
  padding: 20px;
}

.sidebar a {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: theme-color(text);
  text-decoration: none;
}

.sidebar a:hover {
  color: theme-color(primary);
}

.content {
  flex: 1;
}

.follow {
  position: fixed;
}
</style>
