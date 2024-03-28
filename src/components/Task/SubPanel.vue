<template>
  <element id="sub-panel">
    <div id="topbar">
      <el-icon id="enlarge" class="icon" @click="handleExpand"
        ><ArrowLeftBold
      /></el-icon>
      <div id="title"><h2>任务详情</h2></div>
      <el-icon
        v-show="!isDefault"
        id="back"
        class="icon"
        @click="defaultComponent"
        ><CloseBold
      /></el-icon>
    </div>
    <div v-if="task == null" class="loading">暂无内容</div>
    <div v-else>
      <TaskPanel :task="task" />
    </div>
  </element>
</template>

<script>
export default {
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
  height: 100%;
  right: -28%;
  top: 0%;
  border-left: 1px solid theme-color(text);
  background-color: theme-color(white);

  transition: right 0.2s;

  #topbar {
    height: 4%;

    display: flex;

    flex-direction: row;

    .icon {
      height: 100%;
      width: 50px;
      background-color: rgba(255, 255, 255, 0);

      transition: all 0.1s ease;
    }

    #title {
      height: 100%;
      width: 100%;

      background-color: rgba(255, 255, 255, 0);
      display: flex;
      justify-content: center;
      align-items: center;

      h2 {
        margin: 0;
      }
    }
  }
}
</style>
