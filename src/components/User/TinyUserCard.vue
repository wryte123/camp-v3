<template>
  <element class="user-card-tiny">
    <Avatar :user="user.id" />
    {{ username }}
  </element>
</template>

<script>
import Avatar from "../Avatar.vue";

export default {
  components: {
    Avatar,
  },

  props: {
    user: {
      type: Object,
    },
  },

  computed: {
    username() {
      if (!this.user || this.user.username == "") {
        return "nobody";
      }
      return this.user.username;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-card-tiny {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
}
</style>
