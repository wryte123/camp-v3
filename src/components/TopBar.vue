<template>
  <element id="top-nav" :class="{ follow: isFollow }">
    <div>
      <h2 @click="$router.push('/')">Campfire</h2>
    </div>
    <div id="search-trigger" @click="toggleSearch">
      <Search id="search-trigger-icon" />
      <h4>搜索...</h4>
    </div>
    <nav>
      <div class="nav-item" @click="this.$router.push('/about')">关于</div>
      <div class="nav-item" @click="this.$router.push('/chat')">主面板</div>
    </nav>
    <UserLogin />
    <div v-if="showSearch" class="overlay" @click="toggleSearch">
      <component :is="showSearch ? 'Explorer' : ''" />
    </div>
  </element>
</template>

<script>
import UserLogin from "./User/UserLogin.vue";
import Explorer from "./Explorer.vue";

export default {
  name: "SideBar",

  components: {
    UserLogin,
    Explorer,
  },

  props: {
    follow: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showSearch: false,
    };
  },

  computed: {
    isFollow() {
      return this.follow;
    },
  },

  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

#top-nav {
  display: grid;
  grid-template-columns: 3fr 2fr 6fr 3fr;
  place-items: center;
  width: 100vw;
  height: 60px;
  background-color: theme-color(white);

  backdrop-filter: blur(10px);

  border-bottom: 1px solid rgba(0, 0, 0, 0.25);

  background-color: theme-color(background-upper);

  z-index: 990;

  h2 {
    color: theme-color(theme);
  }
}

nav {
  box-sizing: border-box;
  height: 100%;
  width: 20%;

  display: flex;
  flex-direction: row;
  justify-self: flex-end;
}

.nav-item {
  width: 50%;
  font-weight: bold;
  color: theme-color(text);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: theme-color(background);
  }
}

nav a.router-link-exact-active {
  color: theme-color(background);
}

.content {
  flex: 1;
}

.follow {
  position: fixed;
}

#search-trigger {
  width: 100px;

  max-height: 30px;

  border: 1px solid theme-color(text);
  border-radius: 50px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  cursor: pointer;

  #search-trigger-icon {
    height: 20px;
    width: 20px;
  }
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
</style>
