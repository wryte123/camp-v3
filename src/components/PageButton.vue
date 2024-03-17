<template>
  <button @click="handleClick" :class="{ colored: isColored }">
    {{ label }}
  </button>
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
  methods: {
    handleClick() {
      this.$emit("clickEvent");
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
@import "@/styles/global.scss";

.colored {
  border-top: 3px solid theme-color(primary);
  border-bottom: 3px solid theme-color(primary);
  border-left: 3px solid theme-color(primary);
  border-right: 3px solid theme-color(primary);
  color: theme-color(primary);

  &:hover {
    background-color: theme-color(primary);
    color: #fff;
  }
}

button {
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
  background-color: theme-color(background);

  text-align: center;
  text-decoration: none;

  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background-color: theme-color(text);
    color: #fff;
  }
}
</style>
