<template>
  <div id="home-view">
    <Bar follow />

    <header>
      <div>
        <Title />
        <section>
          <Card
            title="功能多样"
            text="整合了实时线上交流，代码管理，版本控制于一身的协作体系。"
          />
          <Card
            title="简单便捷"
            text="遵循了这个理念的Campfire，使得业余开发者，学生团队，以及小规模开发团队在Campfire上进行即时便捷的协作交流。"
          />
          <Card
            title="快速部署"
            text="一个可执行程序，快速启动。Campfire可以部署在你的私有环境中，专门维护属于你的开发项目。"
          />
        </section>
      </div>
      <span @click="scrollDown">
        <el-icon :size="25"><ArrowDownBold /></el-icon>
      </span>
    </header>
    <main ref="main" />
    <!-- footer component -->
  </div>
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
    async scrollDown() {
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
@import "@/styles/global.scss";

#home-view {
  width: 100%;
  display: grid;
  grid-template-rows: 4fr auto;

  color: theme-color(text);

  header {
    height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;

    background: theme-color(white);

    div {
      display: flex;
      height: 100%;
    }

    section {
      height: 100%;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    span {
      height: 100px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 18px;
      color: theme-color(text);

      animation: floatUpDown 2s ease-in-out infinite;
    }
  }

  main {
    min-height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: theme-color(background);
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
