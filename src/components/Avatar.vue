<template>
  <el-avatar v-if="ex">User</el-avatar>
  <el-avatar v-else :src="avatarInfo" @error="handleError" fit="cover" />
</template>

<script>
import { FileAPI } from "@/scripts/api";

export default {
  props: {
    user: {
      type: [Number, String],
    },
  },

  data() {
    return {
      ex: false,
    };
  },

  computed: {
    avatarInfo() {
      if (this.user == "me") {
        return FileAPI.getMyAvatar();
      }
      return FileAPI.getUserAvatar(this.user);
    },
  },

  methods: {
    handleError() {
      this.ex = true;
    },
  },
};
</script>
