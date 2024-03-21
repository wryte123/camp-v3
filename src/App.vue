<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="scss">
@import "@/styles/global.scss";

body {
  margin: 0;
}

#app {
  font-family: "微软雅黑", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.nav-icon {
  height: 40px;
  width: 40px;

  border: 3px solid theme-color(text);
  border-radius: 5px;

  &:hover {
    background-color: theme-color(grey);
  }
}

.tooltip {
  position: absolute;
  left: 100px;
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 1;
  pointer-events: none;
  z-index: 999;
}

.loading {
  text-align: center;
}
</style>
