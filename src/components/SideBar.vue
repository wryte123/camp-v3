<template>
  <aside
    class="sidebar"
    :class="{ follow: isFollow }"
  >
    <div>
      <el-avatar class="avatar nav-icon" />
    </div>
    <div>
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
export default {
  props: {
    follow: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      tooltip: null,
    };
  },

  computed: {
    isFollow() {
      return this.follow;
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
  height: 100%;
  width: 100px;
  min-width: 100px;

  background-color: theme-color(white);
  box-sizing: border-box;
  padding: 20px;

  border-right: 1px solid theme-color(border);

  display: grid;
  grid-template-rows: 1fr 8fr 1fr;

  z-index: 990;
}

.sidebar a {
  display: block;
  margin-bottom: 10px;
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

router-link {
  position: relative;
  display: inline-block;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
