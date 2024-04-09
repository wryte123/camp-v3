<template>
  <tr>
    <element class="file">
      <Folder v-if="file.isDirectory" class="file-icon" />
      <Document v-else class="file-icon" />
      {{ file.name }}
    </element>
  </tr>
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
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;

  box-sizing: border-box;
  padding: 5px;

  border-top: 1px solid theme-color(border);
  border-bottom: 1px solid theme-color(border);

  margin-bottom: -1px;

  &:hover {
    background-color: theme-color(background);
  }
}
</style>
