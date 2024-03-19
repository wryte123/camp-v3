<template>
  <element id="message">
    <div id="bubble">
      <component
        :is="messageComponent"
        :message="message"
      />
    </div>
  </element>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "ChatMessage",

  props: {
    message: {
      typeof: Object,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },

  computed: {
    messageComponent() {
      const typeMap = {
        text: defineAsyncComponent(() => import("./TextMessage.vue")),
        image: defineAsyncComponent(() => import("./ImageMessage.vue")),
      };
      return typeMap[this.message.type] || this.defaultComponent;
    },
    defaultComponent() {
      return () => defineAsyncComponent(import("./DefaultMessage.vue"));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

#message {
  min-height: 60px;
  width: 100%;
  background-color: theme-color(grey);

  box-sizing: border-box;
  padding: 10px;
}

#bubble {
  min-height: 30px;
  min-width: 100px;

  border-radius: 8px;

  background-color: theme-color(primary);

  box-sizing: border-box;

  padding: 10px 10px;

  display: flex;
  justify-items: center;
  align-items: center;

  * {
    margin: 0;
  }
}
</style>
