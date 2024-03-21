<template>
  <element id="sub-panel">
    <div id="topbar">
      <el-icon id="enlarge" class="icon" @click="handleExpand"
        ><ArrowLeftBold
      /></el-icon>
      <div id="title"><h2></h2></div>
      <el-icon
        v-show="!isDefault"
        id="back"
        class="icon"
        @click="defaultComponent"
        ><CloseBold
      /></el-icon>
    </div>
    <div v-loading="!isComponentLoaded" element-loading-background="white">
      <component :is="subComponent" :data="payload"></component>
    </div>
  </element>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { eventBus } from "@/scripts/EventBus.js";

export default {
  data() {
    return {
      payload: {},
      isDefault: true,
      subComponent: null,
      isComponentLoaded: false,
    };
  },

  created() {
    eventBus.subscribe("rend", this.handleEvent);
  },
  destroyed() {
    eventBus.unsubscribe("rend", this.handleEvent);
  },

  methods: {
    handleEvent(event) {
      console.log(event);
      this.payload = event;
      this.loadComponent();
    },
    loadComponent() {
      const typeMap = {
        task: defineAsyncComponent(() => import("../Task/TaskPanel.vue")),
        camp: defineAsyncComponent(() => import("../Camp/CampPanel.vue")),
      };

      this.subComponent.component.onMounted(() => {
        this.isComponentLoaded = true;
      });

      if (!typeMap[this.payload.type]) {
        this.defaultComponent();
      }
      this.subComponent = typeMap[this.payload.type];
      this.isDefault = false;
    },
    defaultComponent() {
      this.subComponent = defineAsyncComponent(import("../Camp/CampPanel.vue"));
      this.isDefault = true;
    },
    handleExpand() {
      this.$emit("toggle");
    },
    panelTitle() {
      if (this.payload.name) {
        return this.payload.name;
      } else {
        return this.payload.title;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.expanded {
  width: 50% !important;
}

.expanded #enlarge {
  transform: rotate(180deg);
}

#sub-panel {
  width: 25%;
  border-style: solid;
  border-width: 1px;
  border-color: theme-color(text);

  transition: width 0.2s;

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
