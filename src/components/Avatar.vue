<template>
  <el-avatar :src="avatarInfo" />
</template>

<script>
import { FileAPI } from "@/scripts/api";

export default {
  props: {
    user: {
      type: [Number, String],
    },
  },

  computed: {
    avatarInfo() {
      if (this.user == "me") {
        return FileAPI.getMyAvatar();
      }
      return FileAPI.getUserAvatar(this.who);
    },
  },
};
</script>
