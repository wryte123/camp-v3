<template>
  <element>
    {{ message.content }}
  </element>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>
