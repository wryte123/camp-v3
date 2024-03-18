<template>
  <element>
    <p>Projects / {{ ProjectName }}</p>
    <Info />
  </element>
</template>

<script>
import ProjectInfo from "./ProjectInfo.vue";

export default {
  name: "ProjectPart",

  components: {
    Info: ProjectInfo,
  },

  props: {
    ProjectName: {
      type: String,
      required: true,
    },
  },
};
</script>
