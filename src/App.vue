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
  overflow: hidden;

  * {
    margin: 0;
  }
}

#app {
  font-family: "微软雅黑", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

.loading-view {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab {
  margin-left: 30px;
  width: 100%;
}

.nav-icon {
  height: 25px;
  width: 25px;
}

.panel-icon {
  height: 30px;
  width: 30px;
}

.file-icon {
  width: 20px;
  height: 20px;
}

.hover-icon {
  width: 30px;
  height: 30px;

  cursor: pointer;

  &:hover {
    background-color: theme-color(grey);
  }
}

.icon-button {
  color: theme-color(white);
  border: 1px solid theme-color(border);
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 70px;
  height: 30px;

  &:hover {
    opacity: 0.7;
  }
}

column {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}
</style>
