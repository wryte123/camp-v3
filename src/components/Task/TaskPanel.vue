<template>
  <element id="task-panel">
    <h1>task.title</h1>
    <small>task.endAt</small>
    <small>task.recvCount</small>
    <small>task.status</small>
    <h2>详情</h2>
    <div id="content">
      <MdPreview
        id="'preview-only'"
        model-value="task.content"
      >
        task.content
      </MdPreview>
    </div>
  </element>
</template>

<script>
export default {
  props: {
    task: {
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

  #content {
    background-color: theme-color(grey);
  }
}
</style>
