<template>
  <button :class="{ colored: isColored }" @click="handleClick">
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
  background-color: theme-color(white);

  text-align: center;
  text-decoration: none;

  transition: background-color 0.2s, color 0.2s;

  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;

  &:hover {
    background-color: theme-color(text);
    color: #fff;
  }
}
</style>
