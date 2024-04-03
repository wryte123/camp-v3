<template>
  <element>
    <div v-if="message.ownerID === currentUserID" class="message-self">
      <div class="timestamp">{{ time }}</div>
      <div class="bubble">
        <component :is="messageComponent" :message="message" />
      </div>
      <Avatar :user="message.ownerID" />
    </div>
    <div v-else class="message-other">
      <Avatar :user="message.ownerID" />
      <div class="bubble">
        <component :is="messageComponent" :message="message" />
      </div>
      <div class="timestamp">{{ time }}</div>
    </div>
  </element>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { formatTimeFromISO } from "@/scripts/utils";
import { CurrentUser, EventTypes } from "@/scripts/session";
import Avatar from "@/components/Avatar.vue";

export default {
  name: "ChatMessage",

  components: {
    Avatar,
  },

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
      currentUserID: CurrentUser.id,
    };
  },

  computed: {
    messageComponent() {
      switch (this.message.eType) {
        case EventTypes().TextMessageEvent:
          return defineAsyncComponent(() => import("./TextMessage.vue"));
        case EventTypes().ImageMessageEvent:
          return defineAsyncComponent(() => import("./ImageMessage.vue"));
        case EventTypes().TaskMessageEvent:
          return defineAsyncComponent(() => import("./TaskMessage.vue"));
        case EventTypes().AnnoMessageEvent:
          return defineAsyncComponent(() => import("./AnnoMessage.vue"));
        case EventTypes().DocMessageEvent:
          return defineAsyncComponent(() => import("./DocMessage.vue"));
        case EventTypes().MDMessageEvent:
          return defineAsyncComponent(() => import("./MDMessage.vue"));
        default:
          return defineAsyncComponent(() => import("./DefaultMessage.vue"));
      }
    },
    defaultComponent() {
      return () => defineAsyncComponent(import("./DefaultMessage.vue"));
    },
    time() {
      return formatTimeFromISO(this.message.timestamp);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

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
    border-radius: 10px;

    background-color: theme-color(background-upper);

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
    color: theme-color(grey);
    font-size: 0.8em;
    align-self: flex-end;
  }
}

.message-self {
  justify-content: flex-end; /* 或者其他颜色以区分 */

  .bubble {
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}

.message-other {
  .bubble {
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
