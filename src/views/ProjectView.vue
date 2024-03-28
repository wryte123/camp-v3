<template>
  <main>
    <Bar follow />
    <section id="proj-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a @click="this.$router.push('/')">Campfire</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><a @click="this.$router.push('/projects')"
            >项目</a
          ></el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ project.title }}</el-breadcrumb-item>
      </el-breadcrumb>
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
      <h2>项目阶段</h2>
      <div class="project-part">
        <el-steps :active="project.stage" finish-status="success" align-center>
          <el-step title="设计" />
          <el-step title="开发阶段" />
          <el-step title="测试阶段" />
          <el-step title="发布阶段" />
          <el-step title="维护阶段" />
          <el-step title="已归档" />
        </el-steps>
      </div>
      <h2>分支</h2>
      <div class="project-part">
        <Branches />
      </div>
      <el-divider></el-divider>
      <h2>成员列表</h2>
      <div id="member-panel">
        <MemberCard v-for="member in project.Members" :key="member.id" />
      </div>
    </section>
    <aside id="proj-sub">
      <p @click="this.$router.push(`/workplace/${project.id}/main`)">
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          class="panel-icon"
        >
          <path
            d="M27.2 6.28l-6.251 35.453M16.734 12.686L5.42 24l11.314 11.314M31.255 12.686L42.57 24 31.255 35.314"
            stroke="#4E5969"
            stroke-width="2"
          /></svg
        >源代码
      </p>
      <p @click="showCommitPanel">项目提交</p>

      <p>任务</p>
      <p>项目文档</p>

      <p>发行版本</p>
      <p>测试</p>
    </aside>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import Branches from "@/components/Project/Branches.vue";
import { ProjectAPI } from "@/scripts/api.js";
import MemberCard from "@/components/Project/MemberCard.vue";

export default {
  name: "ProjectPanel",

  components: {
    Bar: SideBar,
    Branches,
    MemberCard,
  },

  mounted() {
    const id = this.$route.params.project_id;
    this.fetchProjectData(id);
  },

  data() {
    return {
      project: {
        id: 1,
      },
    };
  },

  methods: {
    async fetchProjectData(id) {
      this.project = await ProjectAPI.projectInfo(id);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

main {
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
}

#proj-main {
  width: 80%;
  min-height: 100vh;
  padding: 50px 100px;
  margin-left: 100px;
  margin-right: 15%;

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;

  * {
    margin: 0;
  }

  h1 {
    font-size: 48px;
  }

  #member-panel {
    width: 80%;
    height: 300px;

    border: 1px solid;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }
}

#proj-sub {
  position: fixed;

  right: 0;

  width: 15%;
  height: 100%;

  box-sizing: border-box;
  padding-top: 10%;

  background-color: theme-color(grey);

  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  p {
    width: 70%;

    border: 1px solid;
    border-radius: 10px;
  }
}

.project-part {
  width: 100%;
  border-left: 1px solid;
  border-right: 1px solid;
  box-sizing: border-box;
  padding: 0 30px;
  * {
    margin: 0;
  }
}
</style>
