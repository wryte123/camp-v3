<template>
  <element class="member-card">
    <Avatar :user="data.user.id" @click="toMemberInfo" />
    <div class="member-info">
      <h4>{{ data.nickname === "" ? data.user.username : data.nickname }}</h4>
      <small>{{ data.title }}</small>
    </div>
    <span v-if="currentUserID === data.user.id" @click="editMyInfo">
      <el-icon><Edit /></el-icon> </span
    ><span v-else @click="toMemberChat">
      <el-icon><ChatLineSquare /></el-icon>
    </span>
    <el-dropdown trigger="click">
      <span>
        <el-icon @click="toMemberInfo"><More /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item
            v-if="!data.isRuler && currentUserID != data.user.id"
          >
            升格
          </el-dropdown-item>
          <el-dropdown-item
            v-if="data.isRuler && currentUserID != data.user.id"
          >
            降格
          </el-dropdown-item>
          <el-dropdown-item
            v-if="data.isRuler && currentUserID != data.user.id"
            divided
          >
            <span style="color: red">踢出此人</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </element>
</template>

<script>
import { eventBus } from "@/scripts/EventBus.js";
import { CurrentUser } from "@/scripts/session";
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

  data() {
    return {
      currentUserID: CurrentUser.id,
    };
  },

  methods: {
    toMemberChat() {
      eventBus.publish("toprivate", this.data);
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
  height: 70px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 40px 3fr 30px 30px;

  align-items: center;
  padding: 10px;
  gap: 10px;

  &:hover {
    background-color: theme-color(background-upper);

    cursor: pointer;
  }

  span:hover {
    background-color: theme-color(background) !important;
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
