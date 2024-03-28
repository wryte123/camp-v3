<template>
  <element class="file">
    <Folder v-if="file.type === 'directory'" class="file-icon" />
    <Document v-else-if="file.type === 'document'" class="file-icon" />
  </element>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.file {
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  padding: 5px;

  &:hover {
    background-color: black;
  }
}
</style>
