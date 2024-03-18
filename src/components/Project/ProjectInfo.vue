<template>
  <element>
    <el-descriptions
      :title="{ ProjectName }"
      :column="4"
      :size="large"
      :direction="vertical"
      border
    >
      <el-descriptions-item label="创建者">{{
        ProjectOwner
      }}</el-descriptions-item>
      <el-descriptions-item label="立项时间">{{
        ProjectCreatedTime
      }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{
        ProjectStatus
      }}</el-descriptions-item>
      <el-descriptions-item label="描述">{{
        ProjectDescription
      }}</el-descriptions-item>
    </el-descriptions>
  </element>
</template>

<script>
export default {
  name: "ProjectInfo",

  props: {
    ProjectName: {
      type: String,
      required: true,
    },
    ProjectCreatedTime: {
      type: String,
      required: true,
    },
    ProjectDescription: {
      type: String,
      required: true,
    },
    ProjectOwner: {
      type: String,
      required: true,
    },
  },
  async created() {},
};
</script>

<style lang="scss"></style>
