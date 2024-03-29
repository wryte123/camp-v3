<template>
  <MdPreview
    id="'preview-only'"
    :model-value="message.content"
  />
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
