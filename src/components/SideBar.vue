<template>
  <aside class="sidebar" :class="{ follow: isFollow }">
    <router-link to="/">
      <HomeFilled
        class="nav-icon"
        @mouseover="showTooltip('home')"
        @mouseleave="hideTooltip('home')"
      />
      <transition name="fade">
        <div v-if="tooltip === 'home'" class="tooltip">主页</div></transition
      >
    </router-link>
    <div style="margin-bottom: 10px">————</div>
    <router-link to="/">
      <UserFilled
        class="nav-icon"
        @mouseover="showTooltip('user')"
        @mouseleave="hideTooltip('user')"
      />
      <transition name="fade">
        <div v-if="tooltip === 'user'" class="tooltip">用户</div>
      </transition>
    </router-link>
    <router-link to="/chat">
      <Comment
        class="nav-icon"
        @mouseover="showTooltip('chat')"
        @mouseleave="hideTooltip('chat')"
      /><transition name="fade">
        <div v-if="tooltip === 'chat'" class="tooltip">聊天</div></transition
      >
    </router-link>

    <router-link to="/projects">
      <Files
        class="nav-icon"
        @mouseover="showTooltip('proj')"
        @mouseleave="hideTooltip('proj')"
      /><transition name="fade">
        <div v-if="tooltip === 'proj'" class="tooltip">项目</div></transition
      >
    </router-link>
    <router-link to="/">
      <DocumentChecked
        class="nav-icon"
        @mouseover="showTooltip('task')"
        @mouseleave="hideTooltip('task')"
      /><transition name="fade">
        <div v-if="tooltip === 'task'" class="tooltip">任务</div></transition
      >
    </router-link>
    <router-link to="/">
      <Operation
        class="nav-icon"
        @mouseover="showTooltip('opt')"
        @mouseleave="hideTooltip('opt')"
      /><transition name="fade">
        <div v-if="tooltip === 'opt'" class="tooltip">设置</div></transition
      >
    </router-link>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      follow: false,
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
@import "@/styles/global.scss";

.sidebar {
  position: relative;
  height: 100%;
  width: 100px;

  background-color: theme-color(white);
  box-sizing: border-box;
  padding: 20px;

  border-right: 1px solid rgba(0, 0, 0, 0.25);
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
