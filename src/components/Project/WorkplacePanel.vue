<template>
  <element id="workplace-main" v-loading="!isLoaded">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <a @click="$router.push('/')">Campfire</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <a @click="$router.push('/projects')">项目</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ project.title }}</el-breadcrumb-item>
      <el-breadcrumb-item>Workplace</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(dir, index) in path" :key="index">
        {{ dir.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div id="workplace-bar">
      <el-select
        v-model="branchesProp"
        placeholder="选择分支..."
        filterable
        size="large"
        :loading="!branchesProp"
      >
        <el-option
          v-for="(branch, index) in branchesProp"
          :key="index"
          :label="branch.name"
        />
        <template #loading>
          <svg class="circular" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" />
          </svg>
        </template>
      </el-select>
      <svg class="hover-icon" viewBox="0 0 48 48" fill="none">
        <path
          stroke="#4E5969"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7 7h13v13H7zM28 7h13v13H28zM7 28h13v13H7zM28 28h13v13H28z"
        />
      </svg>
      <svg class="hover-icon" viewBox="0 0 48 48" fill="none">
        <path
          d="M13 24h30M5 12h4m4 24h30M13 12h30M5 24h4M5 36h4"
          stroke="#4E5969"
          stroke-width="2"
        />
      </svg>
    </div>
    <div id="file-area">
      <div class="area-header">
        <TinyUserCard :user="project.owner" />
        <small>demomode</small>
      </div>
      <div v-if="isGrid" id="file-grid">
        <GridFile
          v-for="(file, index) in currentDir.files"
          :key="index"
          :file="file"
          @click="enterFile(file)"
        />
      </div>
      <tbody v-else id="file-list">
        <File
          v-for="(file, index) in currentDir.files"
          :key="index"
          :file="file"
          @click="enterFile(file)"
        />
      </tbody>
    </div>
  </element>
</template>

<script>
// import { GitAPI } from "@/scripts/api.js";
import File from "@/components/Project/File.vue";
import GridFile from "@/components/Project/GridFile.vue";
import TinyUserCard from "../User/TinyUserCard.vue";

export default {
  components: {
    File,
    GridFile,
    TinyUserCard,
  },

  props: {
    project: {
      type: Object,
    },
    branches: {
      type: Array,
    },
  },

  data() {
    return {
      isLoaded: false,
      isGrid: false,
      root: {
        isDirectory: true,
        files: [
          {
            name: "src",
            isDirectory: true,
            files: [
              {
                name: "main.go",
                isDirectory: false,
              },
              {
                name: "handlers",
                isDirectory: true,
                files: [
                  {
                    name: "user_handler.go",
                    isDirectory: false,
                  },
                  {
                    name: "post_handler.go",
                    isDirectory: false,
                  },
                ],
              },
              {
                name: "models",
                isDirectory: true,
                files: [
                  {
                    name: "user_model.go",
                    isDirectory: false,
                  },
                  {
                    name: "post_model.go",
                    isDirectory: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      currentDir: {},
      currentID: this.$route.params.project_id,
      branchesProp: this.branches,
      path: [],
    };
  },

  mounted() {
    this.enterFile(this.root);
  },

  methods: {
    dir() {
      this.isLoaded = false;
      //   GitAPI.dir(this.currentID, this.currentBranch, path).then((response) => {
      //     this.directory = response.data;
      //     this.isLoaded = true;
      //     console.log(response.data);
      //   });
      // .catch(() => {
      //   ElMessage.error("获取工作区失败");
      //   this.$router.back();
      // });
      this.isLoaded = true;
    },
    enterFile(file) {
      if (file.isDirectory) {
        this.currentDir = file;
        this.dir();
      } else {
        this.openFile(file);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

#workplace-main {
  height: 500px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
  padding: 30px;

  #workplace-bar {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
  }

  #file-area {
    height: 100%;
    width: 100%;

    border-radius: 10px;
    border: 1px solid theme-color(border);

    box-sizing: border-box;

    .area-header {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 100%;
      height: 50px;
      background-color: theme-color(background-upper);

      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: flex-start;
      align-items: center;

      box-sizing: border-box;
      padding: 0 20px;
    }

    #file-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: auto;
    }

    #file-list {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
