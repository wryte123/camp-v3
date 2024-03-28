<template>
  <main>
    <Bar />
    <section id="upload-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a @click="this.$router.push('/')">Campfire</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><a @click="this.$router.push('/projects')"
            >项目</a
          ></el-breadcrumb-item
        >
        <el-breadcrumb-item
          ><a @click="this.$router.push(`/project/${project.id}`)"
            >project.title</a
          ></el-breadcrumb-item
        >
        <el-breadcrumb-item
          ><a
            @click="this.$router.push(`/project/${project.id}/${branch_name}`)"
            >branchname</a
          ></el-breadcrumb-item
        >
        <el-breadcrumb-item>提交</el-breadcrumb-item>
      </el-breadcrumb>
      <el-upload
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
      </el-upload>
    </section>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    Bar: SideBar,
  },

  data() {
    return {
      project: {},
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: row;
}

#upload-main {
  display: flex;
  flex-direction: column;
  gap: 50px;

  padding: 50px;
}
</style>
