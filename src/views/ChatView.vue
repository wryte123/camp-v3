<template>
  <main>
    <Bar />
    <MainPanel
      :class="{ expanded: isSubPanelExpanded, 'md-mode': isMDModeOn }"
      :md="isMDModeOn"
      @toggle="toggleExpand"
      @mdtoggle="toggleMarkdownMode"
    />
    <SubPanel
      :class="{ expanded: isSubPanelExpanded }"
      @toggle="toggleExpand"
    />
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
      isMDModeOn: false,
    };
  },

  methods: {
    toggleExpand() {
      if (this.isMDModeOn && this.isSubPanelExpanded) {
        this.isMDModeOn = !this.isMDModeOn;
      }
      this.isMainPanelExpanded = !this.isMainPanelExpanded;
      this.isSubPanelExpanded = !this.isSubPanelExpanded;
    },
    toggleMarkdownMode() {
      if (!this.isMDModeOn && !this.isSubPanelExpanded) {
        this.isMainPanelExpanded = !this.isMainPanelExpanded;
        this.isSubPanelExpanded = !this.isSubPanelExpanded;
      }
      this.isMDModeOn = !this.isMDModeOn;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

main {
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
}
</style>
