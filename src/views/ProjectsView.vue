<template>
  <main>
    <Bar />
    <el-tabs class="tab">
      <el-tab-pane label="项目">
        <el-scrollbar
          ><section id="projects-main">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <a @click="this.$router.push('/')">Campfire</a>
              </el-breadcrumb-item>
              <el-breadcrumb-item
                ><a @click="this.$router.push('/projects')"
                  >项目</a
                ></el-breadcrumb-item
              >
            </el-breadcrumb>
            <div class="end">管理模式<el-switch v-model="isManageMode" /></div>
            <div id="projects">
              <div
                v-for="project in projects"
                :key="project.projectID"
                class="project-item"
                @click="this.$router.push(`/project/${project.projectID}`)"
              >
                <div class="item-start">
                  <h2>{{ project.title }}</h2>
                  {{ project.members.length }}名参与者
                </div>
                <div></div>
                <div class="item-end">
                  <TinyUserCard :user="project.owner" />
                </div>
                <button
                  v-show="isManageMode"
                  class="delete"
                  @click="deleteProject"
                >
                  <el-icon><Delete color="white" /></el-icon>
                </button>
              </div>
            </div></section></el-scrollbar
      ></el-tab-pane>
      <el-tab-pane label="新建">
        <section id="project-create">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <a @click="$router.push('/')">Campfire</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <a @click="$router.push('/projects')">项目</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>新建项目</el-breadcrumb-item>
          </el-breadcrumb>
          <h1>创建新的项目</h1>
          <el-form
            id="project-form"
            :model="projectToCreate"
            label-width="auto"
          >
            <el-form-item label="项目名称">
              <el-input v-model="projectToCreate.title" />
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="projectToCreate.description" type="textarea" />
            </el-form-item>
          </el-form>
          <Button label="创建" @click="createProject" /></section
      ></el-tab-pane>
    </el-tabs>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import TinyUserCard from "@/components/User/TinyUserCard.vue";
import RegularButton from "@/components/RegularButton.vue";
import { UserAPI, ProjectAPI } from "@/scripts/api.js";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  components: {
    Bar: SideBar,
    Button: RegularButton,
    TinyUserCard,
  },

  data() {
    return {
      projects: [],
      projectToCreate: {},
      isManageMode: false,
      isLoaded: false,
    };
  },

  mounted() {
    this.projectsOfUser();
  },

  methods: {
    projectsOfUser() {
      UserAPI.projects().then((response) => {
        if (response.data.length == 0) {
          this.isLoaded = true;
          return;
        }
        this.projects = response.data;
        this.isLoaded = true;
        console.log(this.projects);
      });
    },
    createProject() {
      ProjectAPI.createProject(this.projectToCreate)
        .then((response) => {
          console.log(response);
          ElMessage.success("创建成功");
        })
        .catch((error) => {
          console.error(error);
          ElMessage.error("创建失败");
        });
    },
    deleteProject(project, event) {
      event.stopPropagation();
      ElMessageBox.confirm(`确认删除项目${project.title}吗？`, "删除项目", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        ProjectAPI.disableProject(project.projectID)
          .then(() => {
            ElMessage({
              type: "success",
              message: "删除成功",
            });
            const index = this.projects.findIndex(
              (item) => item.projectID === project.projectID
            );
            if (index !== -1) {
              this.projects.splice(index, 1);
            }
          })
          .catch(() => {
            ElMessage({
              type: "error",
              message: "删除失败",
            });
          });
      });
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
  gap: 20px;
}

#projects-main {
  width: 70%;
  height: 100%;
  padding: 50px 100px;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    text-align: left;
  }

  .end {
    margin-left: auto;

    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }

  #projects {
    box-sizing: border-box;
    padding: 20px;
    border-left: 1px solid theme-color(border);
    border-right: 1px solid theme-color(border);
    display: flex;
    flex-direction: column;
    gap: 15px;

    .project-item {
      width: 100%;
      height: 100px;
      border: 1px solid theme-color(border);
      border-radius: 10px;

      display: flex;
      flex-direction: row;

      * {
        margin: 0;
      }

      .item-start {
        width: 80%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
      }
      .item-end {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        box-sizing: border-box;
        padding: 20px;
      }

      .delete {
        width: 30px;
        background-color: red;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        justify-items: center;
        align-items: center;

        &:hover {
          background-color: theme-color(theme);
        }
      }

      transition: box-shadow 0.1s, left 1s ease-in, top 1s ease-in;

      &:hover {
        position: relative;
        left: -3px;
        top: -3px;
        box-shadow: 1px 1px 3px 3px theme-color(border);
      }
    }
  }
}

#project-create {
  width: 80%;
  height: 100vh;
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

  #proj-form {
    box-sizing: border-box;
    padding-top: 10%;

    background-color: theme-color(grey);

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
}

:deep(.el-tabs__item) {
  font-size: 18px;
}
</style>
