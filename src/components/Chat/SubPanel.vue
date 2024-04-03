<template>
  <element id="sub-panel">
    <div id="topbar">
      <el-icon id="enlarge" class="icon" @click="handleExpand">
        <ArrowLeftBold />
      </el-icon>
      <div />
      <el-icon
        v-show="!isDefault && this.payload.type != 'camp'"
        id="back"
        class="icon"
        @click="defaultComponent"
      >
        <CloseBold />
      </el-icon>
    </div>
    <div v-if="isDefault" class="loading-view">
      <Loading />
    </div>
    <component :is="subComponent" v-else :rendData="payload" />
  </element>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { eventBus } from "@/scripts/EventBus.js";
import Loading from "@/components/Loading.vue";

export default {
  components: {
    Loading,
  },

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
        camp: defineAsyncComponent(() =>
          import("@/components/Camp/CampPanel.vue")
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
      this.isDefault = true;
      this.loaded = false;
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
  background-color: theme-color(white);

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
      transition: all 0.1s ease;
    }

    #title {
      height: 100%;
      width: 90%;

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
