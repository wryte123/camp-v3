<template>
  <element class="task-card">
    <div id="task-bar" />
    <div id="task-info">
      <h3>task.title</h3>
      <p>截止于task.end前</p>
      <p>自由任务</p>
    </div>
  </element>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.task-card {
  width: 300px;
  height: 150px;
  border: 1px solid;
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  gap: 10px;

  #task-bar {
    width: 10%;
    height: 100%;
    border-radius: 10px 0px 0px 10px;
    background-color: black;
  }

  #task-info {
    display: flex;

    flex-direction: column;

    align-items: flex-start;
  }

  transition: box-shadow 0.1s;

  &:hover {
    box-shadow: 1px 1px 3px 3px theme-color(border);
  }
}
</style>
