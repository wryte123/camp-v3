<template>
  <element>
    <Bar follow />
    <section id="proj-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a @click="$router.push('/')">Campfire</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a @click="$router.push('/projects')">项目</a>
        </el-breadcrumb-item><el-breadcrumb>
          {{ project.name }}
        </el-breadcrumb>
      </el-breadcrumb>
      <el-descriptions
        :title="project.name"
        :column="4"
        :size="large"
        :direction="vertical"
        border
      >
        <el-descriptions-item label="创建者">
          project.owner
        </el-descriptions-item>
        <el-descriptions-item label="立项时间">
          project.beginAt
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          project.status
        </el-descriptions-item>
        <el-descriptions-item label="描述">
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
  </element>
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
#proj-main {
}
</style>
