<template>
  <element id="task-panel">
    <h2>task.title</h2>
    <small>task.endAt</small>
    <small>task.recvCount</small>
    <small>task.status</small>
    <p>task.content</p>
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
#task-panel {
  height: 96%;
  width: 100%;

  margin: 0;
}
</style>
