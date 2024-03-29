<template>
  <element id="member-card">
    <el-avatar />
    <div>
      <h4>data.memberName</h4>
      <small>data.memberTitle</small>
    </div>
    <el-icon @click="toMemberChat">
      <ChatLineSquare />
    </el-icon>
    <el-icon @click="toMemberInfo">
      <More />
    </el-icon>
  </element>
</template>

<script>
export default {
  name: "MemberCard",

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  method: {
    toMemberChat() {},

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
