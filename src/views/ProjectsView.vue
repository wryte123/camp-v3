<template>
  <main>
    <Bar follow />
    <el-tabs class="tab">
      <el-tab-pane label="项目"
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
          <div class="end">
            <Button label="刷新" @click="projectsOfUser" />
          </div>
          <div id="projects">
            <div
              v-for="project in projects"
              :key="project.id"
              class="project-item"
              @click="this.$router.push(`/project/${project.id}`)"
            >
              <div class="item-start">
                <h2>project.title</h2>
                project.memberCount
              </div>
              <div></div>
              <div class="item-end">project.owner</div>
            </div>
          </div>
        </section></el-tab-pane
      >
      <el-tab-pane label="新建">
        <section id="project-create">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <a @click="this.$router.push('/')">Campfire</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item
              ><a @click="this.$router.push('/projects')"
                >项目</a
              ></el-breadcrumb-item
            >
            <el-breadcrumb-item>新建项目</el-breadcrumb-item>
          </el-breadcrumb>
          <el-form
            :model="projectToCreate"
            label-width="auto"
            id="project-form"
          >
            <el-form-item label="项目名称">
              <el-input v-model="projectToCreate.name" />
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="projectToCreate.description" type="textarea" />
            </el-form-item>
            <el-form-item>
              <Button label="创建" @click="onSubmit" />
            </el-form-item>
          </el-form></section
      ></el-tab-pane>
    </el-tabs>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import RegularButton from "@/components/RegularButton.vue";
import { UserAPI, ProjectAPI } from "@/scripts/api.js";

export default {
  components: {
    Bar: SideBar,
    Button: RegularButton,
  },

  data() {
    return {
      projects: [
        {
          id: 1,
          title: "name",
          tasks: [
            { id: 1, name: "task" },
            { id: 2, name: "task" },
          ],
        },
        {
          id: 2,
          projectTitle: "2",
          tasks: [{ id: 1, name: "task" }],
        },
        {
          id: 3,
          projectTitle: "name",
        },
        {
          id: 3,
          projectTitle: "name",
        },
        {
          id: 3,
          projectTitle: "name",
        },
        {
          id: 3,
          projectTitle: "name",
        },
        {
          id: 3,
          projectTitle: "name",
        },
        {
          id: 3,
          projectTitle: "name",
        },
      ],
      projectToCreate: {},
    };
  },

  methods: {
    projectsOfUser() {
      this.projects = UserAPI.projects();
    },
    createProject() {
      ProjectAPI.createProject(this.projectToCreate);
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
  gap: 20px;
}

#projects-main {
  width: 70%;
  min-height: 100vh;
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
  }

  #projects {
    box-sizing: border-box;
    padding: 20px;
    border-left: 1px solid theme-color(border);
    border-right: 1px solid theme-color(border);
    display: flex;
    flex-direction: column;
    gap: 15px;

    min-height: 100vh;
    .project-item {
      width: 100%;
      height: 150px;
      border: 1px solid theme-color(border);
      border-radius: 10px;

      box-sizing: border-box;
      padding: 20px;
      gap: 20px;

      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: 1fr;

      &:hover {
        background-color: theme-color(grey);
      }

      * {
        margin: 0;
      }

      .item-start {
        text-align: left;
      }
      .item-end {
        text-align: right;
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
