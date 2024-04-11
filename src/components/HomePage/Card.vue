<template>
  <element id="main">
    <div class="card">
      <h2>功能多样</h2>
      <p>整合了实时线上交流，代码管理，版本控制于一身的协作体系。</p>
    </div>
    <div class="card">
      <h2>简单便捷</h2>
      <p>
        遵循了这个理念的Campfire，使得业余开发者，学生团队，以及小规模开发团队在Campfire上进行即时便捷的协作交流。
      </p>
    </div>
    <div class="card">
      <h2>快速部署</h2>
      <p>
        一个可执行程序，快速启动。Campfire可以部署在你的私有环境中，专门维护属于你的开发项目。
      </p>
    </div>
  </element>
</template>

<script>
export default {
  name: "MainPageCard",
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

element {
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;

  .card {
    width: 300px;

    box-sizing: border-box;

    padding: 20px;

    margin-bottom: 20px;

    border-radius: 10px;
    border-top: 4px solid theme-color(primary);
    border-bottom: 4px solid theme-color(primary);
    border-left: 4px solid theme-color(primary);
    border-right: 4px solid theme-color(primary);

    color: theme-color(text);

    text-align: left;
    text-decoration: none;

    display: flex;
    flex-direction: column;
    gap: 10px;

    transition: all 0.3s ease-in-out;

    h2 {
      margin: 0;
    }
  }
}
</style>
