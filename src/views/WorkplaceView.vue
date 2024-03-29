<template>
  <main>
    <Bar />
    <section id="workplace-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a @click="$router.push('/')">Campfire</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a @click="$router.push('/projects')">项目</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>Workplace</el-breadcrumb-item>
      </el-breadcrumb>
      <div id="file-area">
        <div>
          <svg
            class="hover-icon"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              stroke="#4E5969"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 7h13v13H7zM28 7h13v13H28zM7 28h13v13H7zM28 28h13v13H28z"
            />
          </svg>
          <svg
            class="hover-icon"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M13 24h30M5 12h4m4 24h30M13 12h30M5 24h4M5 36h4"
              stroke="#4E5969"
              stroke-width="2"
            />
          </svg>
        </div>
        <div
          v-if="isGrid"
          id="file-grid"
        >
          <GridFile
            v-for="(file, index) in directory.files"
            :key="index"
            :file="file"
            @click="enterFile(file)"
          />
        </div>
        <div
          v-else
          id="file-list"
        >
          <File
            v-for="(file, index) in directory.files"
            :key="index"
            :file="file"
            @click="enterFile(file)"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import File from "@/components/Project/File.vue";
import GridFile from "@/components/Project/GridFile.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    File,
    GridFile,
    Bar: SideBar,
  },

  data() {
    return {
      isViewLoaded: false,
      isGrid: false,
      workplace: {},
      directory: {
        name: "campfire",
        projectid: 1,

        files: [
          { name: "project.go", type: "document" },
          { name: "test", type: "directory" },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}

#workplace-main {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
  padding: 30px;

  #file-area {
    height: 80%;
    width: 80%;

    border-radius: 20px;
    border: 1px solid theme-color(border);

    box-sizing: border-box;
    padding: 10px;

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
