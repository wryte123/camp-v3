<template>
  <element id="sub-panel">
    <div id="topbar">
      <el-icon id="enlarge" class="icon" @click="handleExpand">
        <ArrowLeftBold />
      </el-icon>
      <el-icon
        v-show="!isDefault"
        id="back"
        class="icon"
        @click="defaultComponent"
      >
        <CloseBold />
      </el-icon>
    </div>
    <div v-if="!task" class="loading-view"><Loading /></div>
    <div v-else>
      <TaskPanel :rendData="task" />
    </div>
  </element>
</template>

<script>
import TaskPanel from "./TaskPanel.vue";
import Loading from "../Loading.vue";

export default {
  components: {
    Loading,
    TaskPanel,
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      payload: {},
      isDefault: true,
      subComponent: null,
    };
  },

  methods: {
    handleExpand() {
      this.$emit("toggle");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.expanded {
  right: 0% !important;
}

.expanded #enlarge {
  transform: rotate(180deg);
}

#sub-panel {
  z-index: 981;
  position: fixed;

  width: 30%;
  height: 100vh;
  right: -28%;
  top: 0%;
  border-left: 1px solid theme-color(border);
  background-color: theme-color(white);

  transition: right 0.2s;

  #topbar {
    height: 4%;

    display: flex;

    flex-direction: row;

    .icon {
      height: 100%;
      width: 50px;
      transition: all 0.1s ease;
    }
  }
}
</style>
