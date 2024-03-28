<template>
  <element class="file">
    <Folder v-if="file.type === 'directory'" class="file-icon" />
    <Document v-else-if="file.type === 'document'" class="file-icon" />
    {{ file.name }}
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
@use "@/styles/global.scss" as *;

.file {
  border-radius: 3px;

  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  box-sizing: border-box;
  padding: 5px;

  border: 1px solid;

  &:hover {
    background-color: theme-color(grey);
  }
}
</style>
