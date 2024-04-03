<template>
  <aside class="sidebar" :class="{ follow: isFollow }">
    <div>
      <Avatar user="me" class="avatar" />
    </div>
    <router-link to="/">
      <div class="sidebar-item">
        <Back
          class="nav-icon"
          @mouseover="showTooltip('home')"
          @mouseleave="hideTooltip('home')"
        />
        <transition name="fade">
          <div v-if="tooltip === 'home'" class="tooltip">主页</div>
        </transition>
      </div>
    </router-link>
    <div class="sidebar-panel">
      <div class="sidebar-item" @click="this.showSearch = !this.showSearch">
        <Search
          class="nav-icon"
          @mouseover="showTooltip('search')"
          @mouseleave="hideTooltip('search')"
        />
        <transition name="fade">
          <div v-if="tooltip === 'search'" class="tooltip">
            搜索
          </div></transition
        >
      </div>
      <div
        class="overlay"
        v-if="showSearch"
        @click="this.showSearch = !this.showSearch"
      >
        <component :is="showSearch ? 'Explorer' : ''"></component>
      </div>
      <router-link to="/chat">
        <div class="sidebar-item" :class="{ active: isActive('/chat') }">
          <ChatLineSquare
            class="nav-icon"
            @mouseover="showTooltip('chat')"
            @mouseleave="hideTooltip('chat')"
          /><transition name="fade">
            <div v-if="tooltip === 'chat'" class="tooltip">交流</div>
          </transition>
        </div>
      </router-link>

      <router-link to="/projects">
        <div class="sidebar-item" :class="{ active: isActive('/projects') }">
          <Files
            class="nav-icon"
            @mouseover="showTooltip('proj')"
            @mouseleave="hideTooltip('proj')"
          /><transition name="fade">
            <div v-if="tooltip === 'proj'" class="tooltip">项目</div>
          </transition>
        </div>
      </router-link>

      <router-link to="/tasks">
        <div class="sidebar-item" :class="{ active: isActive('/tasks') }">
          <DocumentChecked
            class="nav-icon"
            @mouseover="showTooltip('task')"
            @mouseleave="hideTooltip('task')"
          /><transition name="fade">
            <div v-if="tooltip === 'task'" class="tooltip">任务</div>
          </transition>
        </div>
      </router-link>
    </div>
    <div class="sidebar-panel">
      <router-link to="/notice">
        <div class="sidebar-item" :class="{ active: isActive('/notice') }">
          <Message
            class="nav-icon"
            @mouseover="showTooltip('notice')"
            @mouseleave="hideTooltip('notice')"
          />
          <transition name="fade">
            <div v-if="tooltip === 'notice'" class="tooltip">通知</div>
          </transition>
        </div>
      </router-link>

      <router-link to="/options">
        <div class="sidebar-item" :class="{ active: isActive('/options') }">
          <MoreFilled
            class="nav-icon"
            @mouseover="showTooltip('opt')"
            @mouseleave="hideTooltip('opt')"
          /><transition name="fade">
            <div v-if="tooltip === 'opt'" class="tooltip">设置</div>
          </transition>
        </div>
      </router-link>
    </div>
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
    isActive(route) {
      return this.$route.path.startsWith(route);
    },
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
  height: 100%;
  width: 80px;
  min-width: 80px;

  background-color: theme-color(junior);
  box-sizing: border-box;
  padding: 20px 0;

  border-right: 1px solid theme-color(border);

  display: grid;
  grid-template-rows: 1fr 1fr 8fr 2fr;

  z-index: 990;

  .sidebar-panel {
    display: flex;
    flex-direction: column;
  }
}

.sidebar-item {
  height: 60px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: theme-color(theme-upper);
  }
}

.sidebar-item.active {
  background-color: theme-color(theme);
  border-right: 3px solid theme-color(border);
}

.sidebar a {
  display: block;
  font-weight: bold;
  color: theme-color(text);
  text-decoration: none;
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
  border: 2px solid theme-color(border);
}

.nav-icon {
  color: white;
}
</style>
