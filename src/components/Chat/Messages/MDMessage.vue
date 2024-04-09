<template>
  <MdPreview
    style="text-align: left"
    id="'preview-only'"
    :model-value="message.content"
    :show-code-row-number="true"
    preview-theme="vuepress"
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
