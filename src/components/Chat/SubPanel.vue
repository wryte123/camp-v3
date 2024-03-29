<template>
  <element id="sub-panel">
    <div id="topbar">
      <el-icon
        id="enlarge"
        class="icon"
        @click="handleExpand"
      >
        <ArrowLeftBold />
      </el-icon>
      <div />
      <el-icon
        v-show="!isDefault"
        id="back"
        class="icon"
        @click="defaultComponent"
      >
        <CloseBold />
      </el-icon>
    </div>
    <el-skeleton
      v-if="!loaded"
      :rows="10"
      animated
    />
    <component
      :is="subComponent"
      v-else
      :rend-data="payload"
    />
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
      loaded: false,
    };
  },

  created() {
    eventBus.subscribe("rend", this.handleEvent);
  },
  mounted() {
    this.loadComponent();
  },
  beforeDestroy() {
    eventBus.unsubscribe("rend", this.handleEvent);
  },

  methods: {
    handleEvent(event) {
      console.log(event);
      this.payload = event;
      this.loadComponent();
    },
    loadComponent() {
      this.loaded = false;
      const typeMap = {
        task: defineAsyncComponent(() =>
          import("@/components/Task/TaskPanel.vue")
        ),
        project: defineAsyncComponent(() =>
          import("@/components/Project/ProjectPanel.vue")
        ),
        anno: defineAsyncComponent(() =>
          import("@/components/Camp/AnnoPanel.vue")
        ),
      };
      if (!typeMap[this.payload.type]) {
        this.defaultComponent();
        return;
      }
      this.subComponent = typeMap[this.payload.type];
      this.isDefault = false;
      this.loaded = true;
    },
    defaultComponent() {
      this.loaded = false;
      this.subComponent = defineAsyncComponent(() =>
        import("@/components/Camp/CampPanel.vue")
      );
      this.isDefault = true;
      this.loaded = true;
    },
    handleComponentMounted() {
      console.log("handleComponentMounted");
      this.isComponentLoaded = true;
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
@use "@/styles/global.scss" as *;

.expanded {
  width: 40% !important;
}

.expanded #enlarge {
  transform: rotate(180deg);
}

#sub-panel {
  width: 25%;
  border-left: 1px solid theme-color(border);

  transition: width 0.1s;

  #topbar {
    width: 100%;
    height: 40px;

    display: grid;
    grid-template-columns: 50px 8fr 50px;
    grid-template-rows: auto;

    .icon {
      height: 100%;
      width: 50px;
      background-color: rgba(255, 255, 255, 0);

      transition: all 0.1s ease;
    }

    #title {
      height: 100%;
      width: 90%;

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
