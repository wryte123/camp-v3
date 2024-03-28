<template>
  <element id="anno-panel">
    <h2>rendData.title</h2>
    <p>发布于rendData.begin</p>
    <p>由rendData.owner发布</p>
    <div id="anno-content">rendData.content</div>
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

#camp-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  height: 100%;
  width: 100%;
}
</style>
