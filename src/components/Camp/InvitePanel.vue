<template>
  <element class="camp-invite">
    <el-scrollbar>
      <el-checkbox-group class="invite-list" v-model="inviteList">
        <el-checkbox
          v-for="(member, index) in invitable"
          :key="index"
          :value="member.user.id"
          class="member-card"
          :disabled="member.user.id === currentUserID"
          :checked="member.user.id === currentUserID"
        >
          <Avatar :user="member.user.id" />
          <h4>{{ member.user.username }}</h4>
          <small class="member-title">{{ member.title }}</small>
        </el-checkbox>
      </el-checkbox-group>
    </el-scrollbar>
  </element>
</template>

<script>
import { sortMembers } from "@/scripts/utils";
import { CurrentUser } from "@/scripts/session";
import Avatar from "@/components/Avatar.vue";

export default {
  components: {
    Avatar,
  },

  props: {
    joined: {
      type: Array,
    },
    project: {
      type: Object,
    },
  },
  computed: {
    invitable() {
      if (!this.joined) {
        sortMembers(this.project.members);
        return this.project.members;
      } else {
        let res = sortMembers(
          this.project.members.filter((member) => !this.joined.includes(member))
        );
        return res;
      }
    },
  },

  data() {
    return {
      currentUserID: CurrentUser.id,
      inviteList: [],
    };
  },

  watch: {
    inviteList(newInviteList) {
      this.$emit("update", newInviteList);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.camp-invite {
  height: 400px;
  width: 600px;

  background-color: theme-color(white);
  border-radius: 4px;
  border: 1px solid theme-color(border);

  .invite-list {
    display: flex;
    flex-direction: column;
  }
}

.member-card {
  height: 70px;
  width: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;

  align-items: center;
  padding: 10px;
  gap: 10px;

  &:hover {
    background-color: theme-color(grey);
    cursor: pointer;
  }

  .member-title {
    align-self: center;
  }
}

:deep(.el-checkbox__label) {
  width: 100%;

  display: flex;
  flex-direction: row;

  align-items: center;

  gap: 20px;
}
</style>
