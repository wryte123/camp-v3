<template>
  <!-- Nav bar component -->
  <main>
    <List />
    <MainPanel />
  </main>
</template>

<script>
import ChatList from "@/components/Chat/ChatList.vue";
import ChatPanel from "@/components/Chat/ChatPanel.vue";

export default {
  components: {
    List: ChatList,
    MainPanel: ChatPanel,
  },
};
</script>

<style lang="scss" scoped>
main {
  height: 90vh;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr;
}
</style>
