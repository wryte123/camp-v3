<template>
  <main>
    <Bar follow />
    <el-tabs class="tab">
      <el-tab-pane label="我的任务"
        ><div id="task-main" :class="{ 'main-expanded': isSubPanelExpanded }">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <a @click="this.$router.push('/')">Campfire</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>我的任务</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="end">
            <Button label="刷新" @click="tasksOfUser" />
          </div>
          <el-collapse accordion>
            <el-collapse-item
              v-for="project in projects"
              :key="project.id"
              :title="project.projectTitle"
            >
              <div class="tasks-item">
                <TaskCard
                  v-for="task in project.tasks"
                  :key="task.id"
                  :task="task"
                  @click="taskInfo(task.id)"
                />
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <SubPanel
          :class="{ expanded: isSubPanelExpanded }"
          :task="currentTask"
          @toggle="toggleExpand"
      /></el-tab-pane>
      <el-tab-pane label="新建任务">
        <div id="task-main">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <a @click="this.$router.push('/')">Campfire</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item
              ><a @click="this.$router.push('/tasks')"
                >项目</a
              ></el-breadcrumb-item
            >
            <el-breadcrumb-item>新建任务</el-breadcrumb-item>
          </el-breadcrumb>
          <h1>创建</h1>
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
                <el-radio :value="false">指派式</el-radio>
                <el-radio :value="true">自由式</el-radio>
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
      projects: [
        {
          id: 1,
          projectTitle: "name",
          tasks: [
            { id: 1, name: "task1" },
            { id: 2, name: "task2" },
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
      ],
      currentTask: {},
      taskToCreate: {},
      beginDate: "",
      endDate: "",
      beginTime: "",
      endTime: "",
    };
  },

  methods: {
    tasksOfUser() {
      this.projects = UserAPI.tasks();
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
    createTask() {},
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

main {
  position: relative;

  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
}

.main-expanded {
  width: 55% !important;
}

#task-main {
  width: 80%;
  min-height: 100vh;
  padding: 50px 100px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  transition: width 0.2s;

  p {
    text-align: left !important;
  }

  .end {
    width: 10%;
    margin-left: auto;
  }

  .tasks-item {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
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
</style>
