<template>
  <p>未知类型消息</p>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  color: theme-color(red);
}
</style>
