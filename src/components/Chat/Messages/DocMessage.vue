<template>
  <p>message.docName</p>
  <Button label="下载" @click="download()" />
</template>

<script>
import RegularButton from "@/components/RegularButton.vue";

export default {
  components: {
    Button: RegularButton,
  },

  props: {
    message: {
      type: Object,
      required: true,
    },
  },

  methods: {
    download() {},
  },
};
</script>
