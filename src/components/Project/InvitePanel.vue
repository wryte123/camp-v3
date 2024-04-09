<template>
  <element class="project-invite">
    <div class="top">
      <el-input
        v-model="keyword"
        placeholder="输入id或名称..."
        style="width: 96%; align-self: center"
      />
    </div>
    <el-scrollbar>
      <el-checkbox-group class="invite-list" v-model="inviteList">
        <el-checkbox
          v-for="(user, index) in invitable"
          :key="index"
          :value="user.id"
          class="member-card"
          :disabled="user.id === currentUserID"
          :checked="user.id === currentUserID"
        >
          <Avatar :user="user.id" />
          <h4>{{ user.username }}</h4>
        </el-checkbox>
      </el-checkbox-group>
    </el-scrollbar>
  </element>
</template>

<script>
import { isDigit } from "@/scripts/utils";
import { CurrentUser } from "@/scripts/session";
import Avatar from "@/components/Avatar.vue";
import { UserAPI } from "@/scripts/api";
import { ElMessage } from "element-plus";

export default {
  components: {
    Avatar,
  },

  props: {
    joined: {
      type: Array,
    },
  },

  computed: {
    invitable() {
      if (this.joined) {
        return this.users.filter((user) => {
          return !this.joined.some(
            (joinedMember) => joinedMember.user === user
          );
        });
      }
      return this.users;
    },
  },

  data() {
    return {
      keyword: "",
      users: [],
      currentUserID: CurrentUser.id,
      inviteList: [],
    };
  },

  watch: {
    inviteList(newInviteList) {
      this.$emit("update", newInviteList);
    },
    keyword(newValue) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.updateUserList(newValue);
      }, 500);
    },
  },

  methods: {
    updateUserList(info) {
      if (!info) {
        return;
      } else if (isDigit(info)) {
        UserAPI.userInfo(parseInt(info))
          .then((response) => {
            this.users = response.data;
          })
          .catch(() => {
            ElMessage.error("查找失败");
          });
      } else {
        UserAPI.findUsersByName(info)
          .then((response) => {
            this.users = response.data;
          })
          .catch(() => {
            ElMessage.error("查找失败");
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.project-invite {
  height: 400px;
  width: 600px;

  background-color: theme-color(white);
  border-radius: 4px;
  border: 1px solid theme-color(border);

  .top {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    box-sizing: border-box;
    padding: 10px 5px;

    border-bottom: 1px solid theme-color(border);
  }

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
