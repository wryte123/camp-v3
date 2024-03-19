<script setup></script>

<template>
  <main>
    <Bar />
    <List />
    <MainPanel />
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import ChatList from "@/components/Chat/ChatList.vue";
import ChatPanel from "@/components/Chat/ChatPanel.vue";

export default {
  components: {
    Bar: SideBar,
    List: ChatList,
    MainPanel: ChatPanel,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

main {
  height: 100vh;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 2fr 8fr;
  grid-template-rows: 1fr;
}
</style>
