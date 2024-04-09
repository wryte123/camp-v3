<template>
  <element id="workplace-main" v-loading="!isLoaded">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>Workplace</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a @click="dir('')">{{ project.title }}</a></el-breadcrumb-item
      >
      <el-breadcrumb-item
        v-for="(name, index) in currentDir.path.split('/')"
        :key="index"
        >{{ name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div id="workplace-bar">
      <el-select
        v-model="branch"
        placeholder="选择分支..."
        filterable
        size="large"
        :loading="!branches"
        @change="dir('/')"
      >
        <el-option
          v-for="(branch, index) in branches"
          :key="index"
          :label="branch.name"
          :value="branch"
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
          v-show="currentDir.path !== ''"
          :file="{ isDirectory: true, name: '..' }"
          @click="dir('..')"
        />
        <GridFile
          v-for="(file, index) in currentDir.files"
          :key="index"
          :file="file"
          @click="enterFile(file)"
        />
      </div>
      <tbody v-else id="file-list">
        <File
          v-show="currentDir.path !== ''"
          :file="{ isDirectory: true, name: '..' }"
          @click="dir('..')"
        />
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
import { GitAPI } from "@/scripts/api.js";
import File from "@/components/Project/File.vue";
import GridFile from "@/components/Project/GridFile.vue";
import TinyUserCard from "../User/TinyUserCard.vue";
import ElMessage from "element-plus";

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
      currentDir: {
        name: "",
        isDirectory: true,
        path: "",
        files: [],
      },
      currentID: this.$route.params.project_id,
      branch: this.branches[0],
    };
  },

  mounted() {
    console.log(this.project);
    this.dir("");
  },

  methods: {
    dir(path) {
      if (path.startsWith("/")) {
        path = path.substring(1);
      }

      if (path === "..") {
        let last = this.currentDir.path.lastIndexOf("/");
        path = `${this.currentDir.path.substring(0, last)}`;
      }
      this.isLoaded = false;
      let branch = this.branches[0].name;
      if (this.branch) {
        branch = this.branch.name;
      }
      GitAPI.dir(this.currentID, branch, path)
        .then((response) => {
          this.currentDir.path = path;
          this.currentDir.files = response.data.files.sort((a, b) => {
            if (a.isDirectory && !b.isDirectory) {
              return -1;
            }
            if (b.isDirectory && !a.isDirectory) {
              return 1;
            }
            return 0;
          });
          this.isLoaded = true;
          console.log(response.data.files);
        })
        .catch(() => {
          ElMessage.error("获取工作区失败");
          this.$router.back();
        });
      this.isLoaded = true;
    },
    openFile(file) {
      return file;
    },
    enterFile(file) {
      if (file.isDirectory) {
        this.currentDir = file;
        this.dir(`${file.path}/${file.name}`);
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
  min-height: 500px;
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
