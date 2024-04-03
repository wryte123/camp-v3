<template>
  <element id="task-panel">
    <h1>{{ rendData.title }}</h1>
    <small>{{ rendData.endAt }}</small>
    <small>{{ rendData.status }}</small>
    <h1>任务详情</h1>
    <MdPreview id="'preview-only'" :model-value="rendData.content"> </MdPreview>
  </element>
</template>

<script>
export default {
  props: {
    rendData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.expanded {
  width: 50% !important;
}

#task-panel {
  height: 96%;
  width: 100%;

  margin: 0;

  padding: 20px;

  display: flex;
  flex-direction: column;

  gap: 10px;

  text-align: left;

  * {
    margin: 0;
  }
}
</style>
