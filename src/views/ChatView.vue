<template>
  <main>
    <Bar />
    <transition name="panel-transition"
      ><MainPanel :class="{ expanded: isSubPanelExpanded }" />
    </transition>

    <transition name="panel-transition"
      ><SubPanel
        :class="{ expanded: isSubPanelExpanded }"
        @toggle="toggleExpand"
    /></transition>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import ChatPanel from "@/components/Chat/ChatPanel.vue";
import SubPanel from "@/components/Chat/SubPanel.vue";

export default {
  components: {
    Bar: SideBar,
    MainPanel: ChatPanel,
    SubPanel: SubPanel,
  },

  data() {
    return {
      isMainPanelExpanded: true,
      isSubPanelExpanded: false,
    };
  },

  methods: {
    toggleExpand() {
      this.isMainPanelExpanded = !this.isMainPanelExpanded;
      this.isSubPanelExpanded = !this.isSubPanelExpanded;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

main {
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
}
</style>
