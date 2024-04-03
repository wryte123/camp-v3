<template>
  <element class="member-card">
    <Avatar :user="data.user.id" @click="toMemberInfo" />
    <div class="member-info">
      <h4>{{ data.nickname === "" ? data.user.username : data.nickname }}</h4>
      <small>{{ data.memberTitle }}</small>
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

.member-card {
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 40px 3fr 30px 30px;

  align-items: center;
  padding: 10px;
  gap: 10px;

  &:hover {
    background-color: theme-color(grey);
  }

  * {
    margin: 0;

    &:hover {
      cursor: pointer;
    }
  }

  span:hover {
    background-color: theme-color(grey) !important;
  }

  .member-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    justify-content: center;

    * {
      margin: 0;
    }
  }
}
</style>
