<template>
  <element class="member-card">
    <Avatar :user="data.user.id" />
    <div class="member-info">
      <h4>{{ data.user.username }}</h4>
      <small>{{ data.title }}</small>
    </div>
    <el-icon @click="toMemberInfo"><More /></el-icon>
  </element>
</template>

<script>
import Avatar from "../Avatar.vue";

export default {
  name: "MemberCard",

  components: {
    Avatar,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  method: {
    toMemberInfo() {},
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.member-card {
  display: grid;
  grid-template-columns: 40px 3fr 30px;
  gap: 10px;

  width: 100%;
  height: 80px;
  box-sizing: border-box;

  align-items: center;

  padding: 10px;

  &:hover {
    background-color: theme-color(background-upper);
    cursor: pointer;
  }
  .member-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
    justify-content: center;
  }
}
</style>
