<template>
  <main>
    <Bar />
    <el-tabs class="tab">
      <el-tab-pane label="我的任务">
        <el-scrollbar
          ><div id="task-main" :class="{ 'main-expanded': isSubPanelExpanded }">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <a @click="this.$router.push('/')">Campfire</a>
              </el-breadcrumb-item>
              <el-breadcrumb-item>我的任务</el-breadcrumb-item>
            </el-breadcrumb>
            <h1>我的任务</h1>
            <p>
              在此管理所有与您有所关联的任务，无论是由您所创建，还是被指派的，抑或是项目内的自由任务。<br />
              任务以项目为单位列出，您可以点选某一个项目来展开其中的任务列表，并通过点选任务来查看详情。
            </p>
            <el-dropdown trigger="click" @command="handleCommand">
              <div class="el-dropdown-link">
                {{ handleMenu }}
                <el-icon class="el-icon--right">
                  <ArrowDown />
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="project in projects"
                    :key="project.projectID"
                    :command="project.projectID"
                    >{{ project.title }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div class="tasks-item">
              <TaskCard
                v-for="task in project.tasks"
                :key="task.id"
                :task="task"
                @click="taskInfo(task.id)"
              />
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
        <div id="task-main">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <a @click="$router.push('/')">Campfire</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <a @click="$router.push('/tasks')">项目</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>新建任务</el-breadcrumb-item>
          </el-breadcrumb>
          <h1>创建</h1>
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="el-dropdown-link">
              {{ handleMenu }}
              <el-icon class="el-icon--right">
                <ArrowDown />
              </el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="project in projects"
                  :key="project.projectID"
                  :command="project.projectID"
                  >{{ project.title }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-form :model="taskToCreate">
            <el-form-item label="标题">
              <el-input v-model="taskToCreate.title" />
            </el-form-item>
            <el-form-item label="计划启动时间">
              <el-col :span="11">
                <el-date-picker
                  v-model="value2"
                  type="datetime"
                  placeholder="具体时间"
                  :shortcuts="shortcuts"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="计划结束时间">
              <el-col :span="11">
                <el-date-picker
                  v-model="value2"
                  type="datetime"
                  placeholder="具体时间"
                  :shortcuts="shortcuts"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="taskToCreate.isFree">
                <el-radio :value="false"> 指派式 </el-radio>
                <el-radio :value="true"> 自由式 </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="具体描述">
              <el-input v-model="taskToCreate.content" type="textarea" />
            </el-form-item>
            <Button label="提交" @click="createTask" />
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import SubPanel from "@/components/Task/SubPanel.vue";
import { UserAPI, TaskAPI } from "@/scripts/api.js";
import RegularButton from "@/components/RegularButton.vue";
import TaskCard from "@/components/Task/TaskCard.vue";
import { ElMessage } from "element-plus";

export default {
  components: {
    SubPanel,
    Bar: SideBar,
    Button: RegularButton,
    TaskCard,
  },

  data() {
    return {
      isMainPanelExpanded: true,
      isSubPanelExpanded: false,
      projects: null,
      project: {
        projectID: 1,
        projectTitle: "name",
        tasks: [
          { id: 1, name: "task1" },
          { id: 2, name: "task2" },
          { id: 3, name: "任务" },
        ],
      },
      currentTask: {},
      taskToCreate: {},
      beginDate: "",
      endDate: "",
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
      TaskAPI.createTask(this.taskToCreate)
        .then(ElMessage.success("任务创建成功"))
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

#task-main {
  height: 100%;
  padding: 50px 100px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  transition: width 0.2s;

  p {
    text-align: left !important;
  }

  .end {
    width: 10%;
    margin-left: auto;
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
