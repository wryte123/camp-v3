<template>
  <element id="top-nav" :class="{ follow: isFollow }">
    <div>
      <h1 @click="this.$router.push('/')">Campfire</h1>
    </div>
    <div id="search-trigger" @click="toggleSearch">
      <Search id="search-trigger-icon" />
      <h4>搜索...</h4>
    </div>
    <nav>
      <p @click="this.$router.push('/about')">关于</p>
      <p @click="this.$router.push('/chat')">主面板</p>
    </nav>
    <UserLogin />
    <div class="overlay" v-if="showSearch" @click="toggleSearch">
      <component :is="showSearch ? 'Explorer' : ''"></component>
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
  grid-template-columns: 3fr 2fr 6fr 2fr;
  grid-template-rows: 1fr;
  place-items: center;
  width: 100vw;
  background-color: theme-color(white);

  backdrop-filter: blur(10px);

  border-bottom: 1px solid rgba(0, 0, 0, 0.25);

  z-index: 990;
}

nav {
  box-sizing: border-box;
  padding: 20px;
  width: 20%;

  display: flex;
  flex-direction: row;
  gap: 20%;
  justify-self: flex-end;
}

nav p {
  font-weight: bold;
  color: theme-color(text);
  cursor: pointer;
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
  min-width: 250px;

  max-height: 40px;

  border: 1px solid theme-color(text);
  border-radius: 50px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;

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
