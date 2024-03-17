<template>
  <element id="main">
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
  </element>
</template>

<script>
export default {
  name: "MainPageCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

element {
  width: 350px;
  height: 175px;

  box-sizing: border-box;

  padding: 20px;

  margin-bottom: 20px;

  background-color: theme-color(white);

  border-radius: 10px;
  border-top: 4px solid theme-color(primary);
  border-bottom: 4px solid theme-color(primary);
  border-left: 4px solid theme-color(primary);
  border-right: 4px solid theme-color(primary);

  color: theme-color(text);

  text-align: left;
  text-decoration: none;

  display: inline-block;

  transition: all 0.3s ease-in-out;

  h2 {
    margin: 0;
  }

  &:hover {
    box-shadow: inset;
  }
}
</style>
