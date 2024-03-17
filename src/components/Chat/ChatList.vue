<template>
  <element>
    <div v-for="(item, index) in dataList" :key="index">
      <h3>{{ item.name }}</h3>
      <p>{{ item.newMessageCount }}</p>
    </div>
  </element>
</template>

<script>
export default {
  name: "ChatList",
  data() {
    return {
      dataList: [],
    };
  },

  async created() {},
};
</script>

<style lang="scss" scoped>
element {
  margin: 0;

  display: flex;
  flex-direction: row;

  border-style: solid;
  border-width: 1px;
  border-color: theme-color(text);
  div {
    height: 2em;
    width: 100%;

    box-sizing: border-box;

    padding: 10px;

    border-width: 1px;
    border-color: theme-color(text);

    background-color: theme-color(white);

    &:hover {
      background-color: theme-color(grey);
    }
  }
}
</style>
