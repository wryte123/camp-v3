<template>
  <element>
    <h1>Project Campfire</h1>
    <p>简便，易上手的项目版本控制及协作系统</p>
    <div>
      <Button
        label="快速上手"
        colored
      />
      <Button
        label="开始使用"
        @clickEvent="$router.push('/login')"
      />
    </div>
  </element>
</template>

<script>
import PageButton from "../PageButton.vue";

export default {
  name: "HomePageTitle",
  components: {
    Button: PageButton,
  },
};
</script>

<style lang="scss" scoped>
element {
  height: 100%;
  width: 100%;

  box-sizing: border-box;
  padding: 10em 10em;

  display: flex;
  flex-direction: column;
  text-align: left;

  h1 {
    font-size: 64px;
  }

  p {
    font-size: 36px;
    padding-bottom: 2em;
  }

  button {
    margin: 0 10px;
  }
}
</style>
