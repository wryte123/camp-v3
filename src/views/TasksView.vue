<template>
  <main>
    <Bar />
    <el-tabs class="tab">
      <el-tab-pane label="我的任务">
        <el-scrollbar
          ><div
            class="task-view"
            :class="{ 'main-expanded': isSubPanelExpanded }"
          >
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <a @click="this.$router.push('/')">Campfire</a>
              </el-breadcrumb-item>
              <el-breadcrumb-item>我的任务</el-breadcrumb-item>
            </el-breadcrumb>
            <PanelHeader
              title="我的任务"
              text="在此管理所有与您有所关联的任务，无论是由您所创建，还是被指派的，抑或是项目内的自由任务。
              任务以项目为单位列出，您可以点选某一个项目来展开其中的任务列表，并通过点选任务来查看详情。"
              :manage="false"
              :filter="false"
            />
            <el-select
              v-model="project"
              placeholder="选择项目..."
              filterable
              size="large"
              :loading="!projects"
              style="width: 30%"
            >
              <el-option
                v-for="project in projects"
                :key="project.id"
                :label="project.title"
                :value="project.id"
              />
              <template #loading>
                <svg class="circular" viewBox="0 0 50 50">
                  <circle class="path" cx="25" cy="25" r="20" fill="none" />
                </svg>
              </template>
            </el-select>
            <div class="task-main">
              <div class="tasks-item">
                <TaskCard
                  v-for="task in project.tasks"
                  :key="task.id"
                  :task="task"
                  @click="taskInfo(task.id)"
                />
              </div>
            </div>
          </div>
        </el-scrollbar>
        <SubPanel
          :class="{ expanded: isSubPanelExpanded }"
          :task="currentTask"
          @toggle="toggleExpand"
        />
      </el-tab-pane>
      <el-tab-pane label="新建任务">
        <div class="task-view">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <a @click="$router.push('/')">Campfire</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <a @click="$router.push('/tasks')">项目</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>新建任务</el-breadcrumb-item>
          </el-breadcrumb>
          <PanelHeader
            title="创建任务"
            text="创建一项新任务。"
            :manage="false"
            :filter="false"
          />
          <div class="task-main">
            <h1>所属项目</h1>
            <el-select
              v-model="project"
              placeholder="选择项目..."
              size="large"
              style="width: 360px"
            >
              <el-option
                v-for="project in projects"
                :key="project.id"
                :label="project.title"
                :value="project.id"
              />
            </el-select>
            <div class="create-form">
              <column>
                <p>标题</p>
                <el-input v-model="taskToCreate.title" style="width: 240px" />
              </column>
              <column>
                <p>起止时间</p>
                <el-date-picker
                  v-model="time"
                  type="datetimerange"
                  range-separator="To"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                />
              </column>
              <column>
                <p>任务类型</p>
                <el-radio-group v-model="taskToCreate.isFree" style="gap: 10px">
                  <el-radio :value="false"> 指派式 </el-radio>
                  <el-radio :value="true"> 自由式 </el-radio>
                </el-radio-group>
              </column>
              <column
                ><p>具体描述</p>
                <el-input
                  v-model="taskToCreate.content"
                  type="textarea"
                  style="width: 480px"
              /></column>
              <div class="aside">
                <h2>指派成员</h2>
                <InvitePanel />
                <h2>接收成员</h2>
                <InvitePanel />
              </div>
              <Button label="提交" @click="createTask" />
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import SubPanel from "@/components/Task/SubPanel.vue";
import PanelHeader from "@/components/PanelHeader.vue";
import { UserAPI, TaskAPI } from "@/scripts/api.js";
import RegularButton from "@/components/RegularButton.vue";
import InvitePanel from "@/components/Project/InvitePanel.vue";
import TaskCard from "@/components/Task/TaskCard.vue";
import { ElMessage } from "element-plus";

export default {
  components: {
    SubPanel,
    Bar: SideBar,
    Button: RegularButton,
    TaskCard,
    PanelHeader,
    InvitePanel,
  },

  data() {
    return {
      isMainPanelExpanded: true,
      isSubPanelExpanded: false,
      projects: null,
      project: {
        id: 0,
        projectTitle: "name",
        tasks: [
          { id: 1, name: "task1" },
          { id: 2, name: "task2" },
          { id: 3, name: "任务", content: "```auto```" },
        ],
      },
      currentTask: null,
      taskToCreate: {},
      time: "",
      beginTime: "",
      endTime: "",
    };
  },

  created() {
    this.projectsOfUser();
  },

  methods: {
    projectsOfUser() {
      UserAPI.projects()
        .then((response) => {
          this.projects = response.data;
        })
        .catch(() => {
          ElMessage.error("获取信息失败");
        });
    },
    taskInfo(id) {
      this.currentTask = TaskAPI.taskInfo(id);
      this.isMainPanelExpanded = false;
      this.isSubPanelExpanded = true;
    },
    toggleExpand() {
      this.isMainPanelExpanded = !this.isMainPanelExpanded;
      this.isSubPanelExpanded = !this.isSubPanelExpanded;
    },
    createTask() {
      this.taskToCreate.projID = this.project.id;
      TaskAPI.createTask(this.taskToCreate)
        .then(() => {
          ElMessage.success("任务创建成功");
        })
        .catch((error) => {
          ElMessage.error("任务创建失败");
          console.error(error);
        });
    },
    handleMenu() {
      if (this.project.title == "") {
        return "新建项目";
      }
      return this.project.title;
    },
    handleCommand(command) {
      this.project.projectID = command;
      this.taskToCreate.projID = command;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

main {
  position: relative;

  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
}

.main-expanded {
  width: 55% !important;
}

.task-view {
  height: 100%;
  width: 90%;
  padding: 50px 100px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px;

  transition: width 0.2s;

  p {
    text-align: left !important;
  }

  .end {
    width: 10%;
    margin-left: auto;
  }

  .task-main {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    padding: 20px;
    align-items: flex-start;

    border-left: 1px solid theme-color(border);
    border-right: 1px solid theme-color(border);

    * {
      margin: 0;
    }
  }

  .tasks-item {
    width: 100%;
    min-height: 300px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 280px);
    grid-template-rows: auto;

    gap: 20px;
  }

  h1 {
    text-align: left;
  }

  .create-form {
    height: 300px;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 10px;

    .aside {
      width: 50%;
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: flex-start;

      .button: {
        align-self: flex-end;
      }
    }

    p {
      width: 80px;
    }
  }
}

:deep(.el-collapse-item__header) {
  font-size: 20px;
}

:deep(.el-tabs__item) {
  font-size: 18px;
}

.el-dropdown-link {
  cursor: pointer;
  color: theme-color(text);
  display: flex;
  align-items: center;
}
</style>
