<template>
  <element class="element">
    <div class="top-bar">
      <div class="close-button" @click="$emit('close')">
        <Close class="icon" />
      </div>
    </div>
    <div class="create-panel">
      <h1>新频道</h1>
      <small>所属项目</small>
      <el-select
        v-model="currentProject"
        placeholder="选择项目..."
        filterable
        size="large"
        :loading="!projects"
        style="width: 200px"
      >
        <el-option
          v-for="project in projects"
          :key="project.id"
          :label="project.title"
          :value="project"
        />
        <template #loading>
          <svg class="circular" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" />
          </svg>
        </template>
      </el-select>
      <small>名称</small>
      <el-input
        v-model="campToCreate.name"
        placeholder="输入名称..."
        style="width: 250px"
      />
      <small>邀请成员</small>
      <InvitePanel
        :project="currentProject"
        @update="campToCreate.membersID = $event.data"
      />
      <Button label="创建" @click="createCamp" />
    </div>
  </element>
</template>

<script>
import RegularButton from "@/components/RegularButton";
import InvitePanel from "@/components/Camp/InvitePanel";
import { UserAPI, ProjectAPI } from "@/scripts/api";
import { ElMessage } from "element-plus";

export default {
  components: {
    Button: RegularButton,
    InvitePanel,
  },

  data() {
    return {
      projects: [],
      currentProject: {},
      campToCreate: {
        name: "",
        membersID: [],
      },
    };
  },

  created() {
    this.getProjects();
  },

  methods: {
    getProjects() {
      UserAPI.projects()
        .then((response) => {
          this.projects = response.data;
        })
        .catch(() => {
          ElMessage.error("拉取项目信息失败");
        });
    },

    createCamp() {
      if (!this.campToCreate.name) {
        ElMessage.error("名称不可为空！");
        return;
      }
      if (this.membersID.size < 2) {
        ElMessage.error("人数不可少于3名");
        return;
      }
      ProjectAPI.createCamp(this.campToCreate).catch(
        ElMessage.error("创建失败")
      );
    },
  },
};
</script>

<style lang="scss" scpoed>
@use "@/styles/global.scss" as *;

.element {
  display: flex;
  flex-direction: column;

  background-color: theme-color(white);

  border-radius: 10px;

  .top-bar {
    .close-button {
      height: 30px;
      width: 50px;
      float: right;

      border-left: 1px solid theme-color(border);

      display: flex;
      justify-content: center;
      align-items: center;

      border-top-right-radius: 10px;

      &:hover {
        background-color: theme-color(red);

        .icon {
          color: theme-color(white);
        }
      }

      .icon {
        height: 20px;
        width: 20px;
      }
    }
  }

  .create-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;

    box-sizing: border-box;
    padding: 10px 20px;
    align-items: flex-start;

    .button {
      align-self: flex-end;
    }
  }
}
</style>
