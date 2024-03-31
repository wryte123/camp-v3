<template>
  <element class="task-card">
    <div id="task-bar" :class="taskColor"></div>
    <div id="task-info">
      <Avatar :user="task.ownerID" />
      <h3>task.title</h3>
      <small>截止于task.end前</small>
      <p>自由任务</p>
    </div>
  </element>
</template>

<script>
import Avatar from "../Avatar.vue";

export default {
  components: {
    Avatar,
  },

  props: {
    task: {
      type: Object,
    },
  },

  methods: {
    taskColor() {
      return this.task.owner ? `owner-${this.task.owner.title}` : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.task-card {
  width: 280px;
  height: 300px;
  border: 1px solid theme-color(border);
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  gap: 10px;

  * {
    margin: 0;
  }

  #task-bar {
    width: 10%;
    height: 100%;
    border-radius: 10px 0px 0px 10px;
    background-color: theme-color(theme);
  }

  #task-info {
    display: flex;

    flex-direction: column;

    align-items: flex-start;

    box-sizing: border-box;
    padding: 20px;
    gap: 10px;
  }

  transition: box-shadow 0.1s;

  &:hover {
    box-shadow: 1px 1px 3px 3px theme-color(border);
  }
}
</style>
