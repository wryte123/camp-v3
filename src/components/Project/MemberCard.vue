<template>
  <element id="member-card">
    <Avatar :user="data.user.id" />
    <div>
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
#member-card {
  width: 100%;
  height: 10%;
  box-sizing: border-box;

  padding: 10px;
}
</style>
