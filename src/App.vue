<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="scss">
@use "@/styles/global.scss" as *;

body {
  margin: 0;
  color: theme-color(text);
}

#app {
  font-family: "微软雅黑", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.nav-icon {
  height: 35px;
  width: 35px;

  border: 2px solid theme-color(text);
  border-radius: 5px;

  &:hover {
    background-color: theme-color(grey);
  }
}

.panel-icon {
  height: 30px;
  width: 30px;
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
  z-index: 996;
}

.loading {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab {
  margin-left: 150px;
  width: 100%;
}

.file-icon {
  width: 30px;
  height: 30px;
}

.hover-icon {
  width: 30px;
  height: 30px;

  &:hover {
    background-color: theme-color(grey);
  }
}
</style>
