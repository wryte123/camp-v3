<template>
  <main>
    <Bar follow />
    <section id="proj-main">
      <p>Projects / project.name</p>
      <h1>project.name</h1>
      <el-descriptions :column="4" :direction="vertical" border>
        <el-descriptions-item label="创建者">
          project.owner
        </el-descriptions-item>
        <el-descriptions-item label="立项时间">
          project.beginAt
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          project.status
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="1" :direction="vertical" border>
        <el-descriptions-item id="description" label="描述">
          project.description
        </el-descriptions-item>
      </el-descriptions>
    </section>
    <section id="proj-sub">
      <aside>
        <p>参与者</p>
        <p>源代码</p>
        <p>项目提交</p>

        <p>任务</p>
        <p>项目文档</p>

        <p>发行版本</p>
        <p>测试</p>
      </aside>
    </section>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  name: "ProjectPanel",

  components: {
    Bar: SideBar,
  },

  props: {
    project: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
}

#proj-main {
  width: 80%;
  height: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;

  el-descriptions {
    width: 80%;
    height: 300px;
  }
}

#proj-sub {
  width: 20%;
  height: 100%;
}
</style>
