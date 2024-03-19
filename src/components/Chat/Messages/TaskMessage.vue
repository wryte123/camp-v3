<template>
  <element id="task-msg">
    <h3>message.title</h3>
    <small>message.beginAt-message.endAt</small>
    <small>6参与者</small>
    <p>第一次任务</p>
    <small>由message.owner发布</small>
    <Button label="详情" colored @click="subPanelRend" />
  </element>
</template>

<script>
import RegularButton from "@/components/RegularButton.vue";

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
      this.$emit("rend", this.message);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

#task-msg {
  display: flex;
  flex-direction: column;

  * {
    margin: 0;
  }

  h3 {
    align-self: flex-start;
  }

  p {
    background-color: theme-color(grey);
  }
}
</style>
