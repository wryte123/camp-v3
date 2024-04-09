<template>
  <element :class="{ colored: isColored }" @click="handleClick" class="button">
    <p>{{ label }}</p>
  </element>
</template>

<script>
export default {
  name: "PageButton",
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

  computed: {
    isColored() {
      return this.colored;
    },
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
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
  color: theme-color(theme);

  &:hover {
    background-color: theme-color(theme);
    color: theme-color(white);
  }
}

.button {
  width: 200px;
  height: 60px;
  padding: 10px 20px;
  font-size: 24px;

  border-radius: 50px;
  border-top: 3px solid theme-color(text);
  border-bottom: 3px solid theme-color(text);
  border-left: 3px solid theme-color(text);
  border-right: 3px solid theme-color(text);

  color: theme-color(text);

  transition: background-color 0.2s, color 0.2s, opacity 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    background-color: theme-color(text);
    color: #fff;
  }
}
</style>
