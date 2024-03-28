<template>
  <element id="member-card">
    <el-avatar @click="toMemberInfo"
      ><img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
    /></el-avatar>
    <div>
      <h4>data.memberName</h4>
      <small>data.memberTitle</small>
    </div>
    <span>
      <el-icon @click="toMemberChat"><ChatLineSquare /></el-icon>
    </span>
    <span>
      <el-icon @click="toMemberInfo"><More /></el-icon>
    </span>
  </element>
</template>

<script>
import { eventBus } from "@/scripts/EventBus.js";

export default {
  name: "MemberCard",

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  method: {
    toMemberChat() {
      eventBus.publish("toprivate", this.data.userID);
    },

    toMemberInfo() {
      eventBus.publish("rend", this.data.user);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

#member-card {
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1fr 3fr 30px 30px;

  // display: flex;
  // flex-direction: row;

  align-items: center;
  padding: 10px;

  * {
    margin: 0;

    &:hover {
      cursor: pointer;
    }
  }

  span:hover {
    background-color: theme-color(grey) !important;
  }
}
</style>
