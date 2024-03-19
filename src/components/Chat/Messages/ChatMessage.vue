<template>
  <element>
    <div v-if="message.userID === currentUserID" class="message-self">
      <div class="timestamp">message.timestamp</div>
      <div class="bubble">
        <component
          :is="messageComponent"
          :message="message"
          @rend="handleRend"
        ></component>
      </div>
      <el-avatar :size="size" :src="circleUrl" />
    </div>
    <div v-else class="message-other">
      <el-avatar :size="size" :src="circleUrl" />
      <div class="bubble">
        <component
          :is="messageComponent"
          :message="message"
          @rend="handleRend"
        ></component>
      </div>
      <div class="timestamp">message.timestamp</div>
    </div>
  </element>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "ChatMessage",

  props: {
    message: {
      type: Object,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      currentUserID: 1,
    };
  },

  computed: {
    messageComponent() {
      const typeMap = {
        text: defineAsyncComponent(() => import("./TextMessage.vue")),
        image: defineAsyncComponent(() => import("./ImageMessage.vue")),
        task: defineAsyncComponent(() => import("./TaskMessage.vue")),
        anno: defineAsyncComponent(() => import("./AnnoMessage.vue")),
        doc: defineAsyncComponent(() => import("./DocMessage.vue")),
      };
      return typeMap[this.message.type] || this.defaultComponent;
    },
    defaultComponent() {
      return () => defineAsyncComponent(import("./DefaultMessage.vue"));
    },
  },

  method: {
    handleRend(payload) {
      console.log(1);
      this.$emit("rend", payload);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.message-self,
.message-other {
  width: 100%;

  display: flex;
  flex-grow: 1;
  flex-direction: row;

  gap: 10px;

  box-sizing: border-box;
  padding: 10px;

  .bubble {
    border-radius: 8px;

    background-color: theme-color(white);

    box-sizing: border-box;

    padding: 10px 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    * {
      margin: 0;
    }
  }
  .timestamp {
    /* 根据需要自定义时间戳的样式 */
    color: theme-color(grey);
    font-size: 0.8em;
    align-self: flex-end;
  }
}

.message-self {
  justify-content: flex-end; /* 或者其他颜色以区分 */
}
</style>
