<template>
  <element id="camp-panel">
    <div id="camp-card">
      <h1>camp.chatName</h1>
      <small>camp.chatMemberCount</small>
    </div>
    <MemberCard v-for="member in members" :key="member.userId" :data="member" />
  </element>
</template>

<script>
import MemberCard from "./MemberCard.vue";

export default {
  components: {
    MemberCard,
  },

  props: {
    camp: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      members: [],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

#camp-panel {
  display: flex;
  flex-direction: column;

  height: 96%;
  width: 100%;

  #camp-card {
    height: 30%;
    width: 100%;
  }
}
</style>
