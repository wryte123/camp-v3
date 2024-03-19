<template>
  <element>
    <div id="topbar">
      <el-icon id="back" @click="defaultComponent"><ArrowLeft /></el-icon>
      <div id="title"><h2>data.chatName</h2></div>
    </div>
    <component :is="subComponent" :data="eventData"></component>
  </element>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  props: {
    payload: {
      type: Object,
      required: true,
    },
  },

  methods: {
    subComponent() {
      const typeMap = {
        task: defineAsyncComponent(() => import("../Task/TaskPanel.vue")),
      };
      return typeMap[this.payload.type] || this.defaultComponent;
    },
    defaultComponent() {
      return () => defineAsyncComponent(import("../Camp/CampPanel.vue"));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

#topbar {
  height: 4%;

  display: flex;

  flex-direction: row;

  #back {
    height: 100%;
    width: 15%;
    background-color: theme-color(background);

    transition: all 0.1s ease;

    &:hover {
      background-color: theme-color(background-upper);
    }
  }

  #title {
    height: 100%;
    width: 85%;

    background-color: theme-color(background-upper);
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      margin: 0;
    }
  }
}
</style>
