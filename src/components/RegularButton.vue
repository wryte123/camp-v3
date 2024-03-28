<template>
  <button @click="handleClick" :class="{ colored: isColored }">
    {{ label }}
  </button>
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
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    },
  },

  computed: {
    isColored() {
      return this.colored;
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
  background-color: theme-color(theme);
  color: theme-color(white);

  transition: border-color 0.1s, background-color 0.1s;

  &:hover {
    border-color: theme-color(theme-upper);
    background-color: theme-color(theme-upper);
    color: #fff;
  }
}

button {
  height: 40px;
  padding: 3px 10px;
  font-size: 16px;
  width: 80px;

  border-radius: 10px;
  border-top: 2px solid theme-color(text);
  border-bottom: 2px solid theme-color(text);
  border-left: 2px solid theme-color(text);
  border-right: 2px solid theme-color(text);

  color: theme-color(text);
  background-color: theme-color(white);

  text-align: center;
  text-decoration: none;

  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;

  &:hover {
    background-color: theme-color(text);
    color: #fff;
  }
}
</style>
