<template>
  <main>
    <Bar />
    <el-scrollbar style="width: 100%">
      <section id="proj-main" v-loading="!isLoaded" v-if="!isLoaded"></section>
      <section id="proj-main" v-else>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <a @click="$router.push('/')">Campfire</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item
            ><a @click="$router.push('/projects')">项目</a></el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ project.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>{{ project.title }}</h1>
        <el-descriptions :column="4" direction="vertical" border>
          <el-descriptions-item label="创建者">
            {{ project.owner.username }}
          </el-descriptions-item>
          <el-descriptions-item label="立项时间">
            {{ format(project.begin) }}
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="1" :direction="vertical" border>
          <el-descriptions-item id="description" label="描述">
            {{ project.description }}
          </el-descriptions-item>
        </el-descriptions>
        <h2>项目阶段</h2>
        <div class="project-part">
          <el-steps
            :active="project.status"
            finish-status="success"
            align-center
          >
            <el-step title="设计" />
            <el-step title="开发阶段" />
            <el-step title="测试阶段" />
            <el-step title="发布阶段" />
            <el-step title="维护阶段" />
            <el-step title="已归档" />
          </el-steps>
        </div>
        <h2>工作空间</h2>
        <div class="project-part">
          <WorkplacePanel :project="project" :branches="branches" />
        </div>
        <h2>分支</h2>
        <div class="project-part">
          <Branches :branches="branches" />
        </div>
        <h2>成员列表</h2>
        <div id="member-panel">
          <el-scrollbar>
            <div id="member-list">
              <MemberCard
                v-for="member in project.members"
                :key="member.userId"
                :data="member"
              />
            </div>
          </el-scrollbar>
        </div>
      </section>
    </el-scrollbar>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import Branches from "@/components/Project/Branches.vue";
import WorkplacePanel from "@/components/Project/WorkplacePanel.vue";
import { ProjectAPI } from "@/scripts/api.js";
import { formatDateFromISO } from "@/scripts/utils.js";
import MemberCard from "@/components/Project/MemberCard.vue";
import { ElMessage } from "element-plus";

export default {
  name: "ProjectPanel",

  components: {
    Bar: SideBar,
    WorkplacePanel,
    Branches,
    MemberCard,
  },

  mounted() {
    const id = this.$route.params.project_id;
    this.fetchProjectData(id);
  },

  data() {
    return {
      project: {},
      isLoaded: false,
      branches: [
        {
          name: "main",
          isMain: true,
          updated: "2024-04-02T11:13:46.626Z",
        },
        {
          name: "master",
          updated: "2024-04-02T11:13:46.626Z",
        },
      ],
    };
  },

  methods: {
    fetchProjectData(id) {
      ProjectAPI.projectInfo(id)
        .then((response) => {
          this.project = response.data;
          this.isLoaded = true;
          console.log(this.project);
        })
        .catch(() => {
          ElMessage.error("获取项目信息时错误");
          this.$router.back();
        });
    },
    format(time) {
      return formatDateFromISO(time);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

main {
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
}

#proj-main {
  min-height: 100vh;
  padding: 50px 100px;

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
    width: 100%;
    height: 300px;

    border: 1px solid theme-color(border);

    #member-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: auto;
    }
  }
}

#proj-sub {
  width: 15%;
  height: 100%;

  box-sizing: border-box;
  padding-top: 10%;

  border-left: 1px solid theme-color(border);

  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  p {
    width: 70%;

    border: 1px solid theme-color(border);
    border-radius: 10px;
  }
}

.project-part {
  width: 100%;
  border-left: 1px solid theme-color(border);
  border-right: 1px solid theme-color(border);
  box-sizing: border-box;
  padding: 0 30px;
  * {
    margin: 0;
  }
}
</style>
