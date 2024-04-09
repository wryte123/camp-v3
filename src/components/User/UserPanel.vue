<template>
  <element class="user-panel">
    <Avatar :user="rendData.id" style="width: 100px; height: 100px" />
    <h2>{{ rendData.username }}</h2>
    <small>{{ rendData.email }}</small>
  </element>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  components: {
    Avatar,
  },

  props: {
    rendData: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 20px;

  align-items: flex-start;
}
</style>
