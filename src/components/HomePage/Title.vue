<template>
  <element id="page-title">
    <h1>Project <span>Campfire</span></h1>
    <p>简便，易上手的项目版本控制及协作系统</p>
  </element>
</template>

<script>
// import PageButton from "../PageButton.vue";

export default {
  name: "HomePageTitle",
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

#page-title {
  width: 100%;

  box-sizing: border-box;
  padding: 6%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;

  h1 {
    font-size: 72px;

    span {
      color: theme-color(theme);
    }
  }

  p {
    font-size: 36px;
  }
}
</style>
