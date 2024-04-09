<template>
  <element
    :class="({ colored: isColored }, { dangerous: isDangerous })"
    class="button"
  >
    <p>{{ label }}</p>
  </element>
</template>

<script>
export default {
  name: "RegularButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    colored: {
      type: Boolean,
      default: false,
    },
    dangerous: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isColored() {
      return this.colored;
    },
    isDangerous() {
      return this.dangerous;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.colored {
  border-top: 3px solid theme-color(theme);
  border-bottom: 3px solid theme-color(theme);
  border-left: 3px solid theme-color(theme);
  border-right: 3px solid theme-color(theme);
  color: theme-color(white);

  transition: border-color 0.1s, background-color 0.1s;

  &:hover {
    border-color: theme-color(theme-upper);
    background-color: theme-color(theme-upper);
    color: #fff;
  }
}

.dangerous {
  border-top: 3px solid theme-color(red);
  border-bottom: 3px solid theme-color(red);
  border-left: 3px solid theme-color(red);
  border-right: 3px solid theme-color(red);
  background-color: theme-color(red);
  color: theme-color(white);

  transition: border-color 0.1s, background-color 0.1s;

  &:hover {
    border-color: theme-color(theme-upper);
    background-color: theme-color(theme-upper);
    color: #fff;
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  padding: 3px 10px;
  font-size: 16px;
  width: 80px;

  border-radius: 10px;
  border-top: 2px solid theme-color(text);
  border-bottom: 2px solid theme-color(text);
  border-left: 2px solid theme-color(text);
  border-right: 2px solid theme-color(text);

  color: theme-color(text);

  text-decoration: none;

  margin: 4px 2px;
  cursor: pointer;

  &:hover {
    background-color: theme-color(text);
    color: theme-color(white);
  }
}
</style>
