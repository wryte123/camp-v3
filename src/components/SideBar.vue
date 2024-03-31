<template>
  <aside
    class="sidebar"
    :class="{ follow: isFollow }"
  >
    <div>
      <Avatar user="me" class="avatar" />
    </div>
    <div class="sidebar-panel">
      <div>
        <Search
          class="nav-icon"
          @click="this.showSearch = !this.showSearch"
          @mouseover="showTooltip('search')"
          @mouseleave="hideTooltip('search')"
        />
        <transition name="fade">
          <div v-if="tooltip === 'search'" class="tooltip">
            搜索
          </div></transition
        >
        <div
          class="overlay"
          v-if="showSearch"
          @click="this.showSearch = !this.showSearch"
        >
          <component :is="showSearch ? 'Explorer' : ''"></component>
        </div>
      </div>
      <router-link to="/">
        <HomeFilled
          class="nav-icon"
          @mouseover="showTooltip('home')"
          @mouseleave="hideTooltip('home')"
        />
        <transition name="fade">
          <div
            v-if="tooltip === 'home'"
            class="tooltip"
          >
            主页
          </div>
        </transition>
      </router-link>
      <router-link to="/chat">
        <ChatLineSquare
          class="nav-icon"
          @mouseover="showTooltip('chat')"
          @mouseleave="hideTooltip('chat')"
        /><transition name="fade">
          <div
            v-if="tooltip === 'chat'"
            class="tooltip"
          >
            聊天
          </div>
        </transition>
      </router-link>

      <router-link to="/projects">
        <Files
          class="nav-icon"
          @mouseover="showTooltip('proj')"
          @mouseleave="hideTooltip('proj')"
        /><transition name="fade">
          <div
            v-if="tooltip === 'proj'"
            class="tooltip"
          >
            项目
          </div>
        </transition>
      </router-link>
      <router-link to="/tasks">
        <DocumentChecked
          class="nav-icon"
          @mouseover="showTooltip('task')"
          @mouseleave="hideTooltip('task')"
        /><transition name="fade">
          <div
            v-if="tooltip === 'task'"
            class="tooltip"
          >
            任务
          </div>
        </transition>
      </router-link>
    </div>
    <router-link to="/options">
      <MoreFilled
        class="panel-icon"
        @mouseover="showTooltip('opt')"
        @mouseleave="hideTooltip('opt')"
      /><transition name="fade">
        <div
          v-if="tooltip === 'opt'"
          class="tooltip"
        >
          设置
        </div>
      </transition>
    </router-link>
  </aside>
</template>

<script>
import Explorer from "@/components/Explorer.vue";
import Avatar from "@/components/Avatar.vue";
import { FileAPI } from "@/scripts/api";

export default {
  components: {
    Explorer,
    Avatar,
  },

  props: {
    follow: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      tooltip: null,
      showSearch: false,
    };
  },

  computed: {
    isFollow() {
      return this.follow;
    },

    myAvatar() {
      return FileAPI.getMyAvatar();
    },
  },
  methods: {
    showTooltip(text) {
      this.tooltip = text;
    },
    hideTooltip() {
      this.tooltip = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.sidebar {
  position: relative;
  height: 100vh;
  width: 100px;
  min-width: 100px;

  background-color: theme-color(white);
  box-sizing: border-box;
  padding: 20px;

  border-right: 1px solid theme-color(border);

  display: grid;
  grid-template-rows: 1fr 8fr 1fr;

  z-index: 990;

  .sidebar-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.sidebar a {
  display: block;
  font-weight: bold;
  color: theme-color(text);
  text-decoration: none;
}

.sidebar a:hover {
  color: theme-color(primary);
}

.content {
  flex: 1;
}

.follow {
  position: fixed;
}

router-link,
.search {
  position: relative;
  display: inline-block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
S .fade-leave-to {
  opacity: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.avatar {
  border: 2px solid theme-color(text);
}
</style>
