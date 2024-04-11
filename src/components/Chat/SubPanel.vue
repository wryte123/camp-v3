<template>
  <element id="sub-panel">
    <div id="top-bar">
      <el-icon id="enlarge" class="icon" @click="handleExpand">
        <ArrowLeftBold />
      </el-icon>
      <div />
      <el-icon
        v-show="
          !isDefault &&
          this.payload.type != 'camp' &&
          this.payload.type != 'user'
        "
        id="back"
        class="icon"
        @click="back"
      >
        <CloseBold />
      </el-icon>
    </div>
    <div v-if="isDefault" class="loading-view">
      <Loading />
    </div>
    <component :is="subComponent" v-else :rendData="payload.data" />
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
      payload: {
        data: {},
        type: "",
      },
      isDefault: true,
      subComponent: null,
      loaded: false,
      defaultData: {},
      typeMap: {
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
        user: defineAsyncComponent(() =>
          import("@/components/User/UserPanel.vue")
        ),
      },
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
    handleEvent(event, type) {
      console.log(event);
      this.payload = {
        data: event,
        type: type,
      };
      this.loadComponent();
    },
    loadComponent() {
      this.loaded = false;
      if (!this.typeMap[this.payload.type]) {
        this.defaultComponent();
        return;
      } else if (
        this.typeMap[this.payload.type] == "camp" ||
        this.typeMap[this.payload.type] == "user"
      ) {
        this.default = this.payload;
      }
      this.subComponent = this.typeMap[this.payload.type];
      this.isDefault = false;
      this.loaded = true;
    },
    defaultComponent() {
      this.isDefault = true;
      this.loaded = false;
    },
    back() {
      this.loadComponent(this.defaultData);
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

  #top-bar {
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

.loading-view {
  svg {
    position: relative;
    top: -40px;
  }
}
</style>
