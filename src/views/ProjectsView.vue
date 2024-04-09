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
            <PanelHeader
              @manage="isManageMode = !isManageMode"
              title="项目"
              text="这里是您项目的总览，点选对应的卡片来查看详情，并通过管理模式来进行关键操作。"
            />
            <div id="projects" v-loading="!isLoaded">
              <div
                v-for="project in projects"
                :key="project.id"
                class="project-item"
                @click="this.$router.push(`/projects/${project.id}`)"
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
                  @click="deleteProject(project, $event)"
                >
                  <el-icon><Delete color="white" /></el-icon>
                </button>
              </div>
            </div></section></el-scrollbar
      ></el-tab-pane>
      <el-tab-pane label="新建"
        ><el-scrollbar>
          <section id="project-create">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <a @click="$router.push('/')">Campfire</a>
              </el-breadcrumb-item>
              <el-breadcrumb-item> 项目 </el-breadcrumb-item>
              <el-breadcrumb-item>新建项目</el-breadcrumb-item>
            </el-breadcrumb>
            <PanelHeader
              title="创建新的项目"
              text="在此创建新的项目，并邀请新的成员，项目默认对他人不可见。"
              :manage="false"
              :filter="false"
            />
            <div class="create-panel">
              <h1>项目名称</h1>
              <el-input
                v-model="projectToCreate.title"
                style="width: 240px"
                size="large"
                ><template #append>.git</template></el-input
              >
              <h1>项目描述</h1>
              <el-input
                v-model="projectToCreate.description"
                type="textarea"
                style="width: 30%"
                :autosize="{ minRows: 2, maxRows: 10 }"
                resize="none"
              />
              <h1>邀请成员</h1>
              <InvitePanel />
              <Button label="创建" @click="createProject" />
            </div></section></el-scrollbar
      ></el-tab-pane>
    </el-tabs>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import PanelHeader from "@/components/PanelHeader.vue";
import TinyUserCard from "@/components/User/TinyUserCard.vue";
import RegularButton from "@/components/RegularButton.vue";
import InvitePanel from "@/components/Project/InvitePanel.vue";
import { UserAPI, ProjectAPI } from "@/scripts/api.js";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  components: {
    Bar: SideBar,
    Button: RegularButton,
    TinyUserCard,
    PanelHeader,
    InvitePanel,
  },

  data() {
    return {
      projects: [],
      projectToCreate: {},
      isManageMode: false,
      isLoaded: false,
    };
  },

  created() {
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
        ProjectAPI.disableProject(project.id)
          .then(() => {
            ElMessage({
              type: "success",
              message: "删除成功",
            });
            const index = this.projects.findIndex(
              (item) => item.id === project.id
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
}

#projects-main {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 100px;
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
    min-height: 150px;
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

        border: 1px solid theme-color(border);

        &:hover {
          background-color: theme-color(theme);
        }
      }

      transition: box-shadow 0.1s, left 1s ease-in, top 1s ease-in;

      &:hover {
        position: relative;
        left: -3px;
        top: -3px;
        box-shadow: 1px 2px 2px 2px theme-color(border);
      }
    }
  }
}

#project-create {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;

  * {
    margin: 0;
  }

  .create-panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    box-sizing: border-box;
    padding: 20px;

    align-items: flex-start;

    border-left: 1px solid theme-color(border);
    border-right: 1px solid theme-color(border);
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
