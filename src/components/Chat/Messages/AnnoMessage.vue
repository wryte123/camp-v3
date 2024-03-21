<template>
  <element id="anno-msg">
    <h3>message.title</h3>
    <small>发布于message.beginAt</small>
    <p>message.content</p>
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

#anno-msg {
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
