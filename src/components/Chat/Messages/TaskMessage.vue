<template>
  <element id="task-msg">
    <h3>{{ message.title }}</h3>
    <small>({{ message.beginAt }}) - ({{ message.endAt }})</small>
    <small>6参与者</small>
    <p>第一次任务</p>
    <small>由{{ message.owner }}发布</small>
    <Button label="详情" colored @click="subPanelRend" />
  </element>
</template>

<script>
import RegularButton from "@/components/RegularButton.vue";
import { eventBus } from "@/scripts/EventBus.js";

export default {
  components: {
    Button: RegularButton,
  },

  props: {
    message: {
      type: Object,
      required: true,
    },
  },

  methods: {
    subPanelRend() {
      eventBus.publish("rend", this.message, "task");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

#task-msg {
  display: flex;
  flex-direction: column;
  gap: 10px;

  min-width: 200px;

  * {
    margin: 0;
  }

  h3,
  small {
    align-self: flex-start;
  }

  p {
    background-color: theme-color(grey);
  }

  button {
    width: 100%;
  }
}
</style>
