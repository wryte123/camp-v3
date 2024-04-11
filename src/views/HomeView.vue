<template>
  <main id="home-view">
    <Bar />
    <el-scrollbar height>
      <header>
        <Title />
        <Card />
        <span @click="scrollDown">
          <el-icon :size="25"><ArrowDownBold /></el-icon>
        </span>
      </header>
      <section ref="main" id="home-main"></section>
      <!-- footer component -->
    </el-scrollbar>
  </main>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import MainPageCard from "../components/HomePage/Card.vue";
import HomePageTitle from "../components/HomePage/Title.vue";

export default {
  components: {
    Title: HomePageTitle,
    Card: MainPageCard,
    Bar: TopBar,
  },

  methods: {
    scrollDown() {
      const mainElement = this.$refs.main;
      window.scrollTo({
        top: mainElement.getBoundingClientRect().top + window.pageYOffset,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

#home-view {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 4fr auto;

  background-color: theme-color(background-upper);

  color: theme-color(text);

  header {
    height: calc(100vh - 60px);
    width: 100%;

    display: flex;
    flex-direction: column;

    span {
      height: 100px;

      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: auto;

      font-size: 18px;
      color: theme-color(text);

      animation: floatUpDown 2s ease-in-out infinite;
    }

    .buttons {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: center;
      gap: 20px;
    }
  }

  #home-info {
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    font-size: 24px;
  }
}

@keyframes floatUpDown {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
