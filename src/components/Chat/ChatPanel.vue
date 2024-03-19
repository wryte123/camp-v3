<template>
  <element id="panel">
    <section id="chat">
      <div id="board">
        <el-scrollbar ref="bar" @scroll="handleScroll" height="85vh">
          <div ref="board">
            <Message
              ref="messages"
              v-for="msg in messages"
              :key="msg.id"
              :message="msg"
              @rend="handleRend"
            />
          </div>
        </el-scrollbar>
      </div>
      <div id="chat-protocol">
        <div id="chatbar"></div>
        <div id="submit">
          <textarea class="chatinput" />
          <el-button>发送</el-button>
        </div>
      </div>
    </section>
    <section id="sub">
      <SubPanel :payload="payload" />
    </section>
  </element>
</template>

<script>
import ChatMessage from "./Messages/ChatMessage.vue";
import SubPanel from "./SubPanel.vue";

export default {
  name: "ChatPanel",

  components: {
    Message: ChatMessage,
    SubPanel: SubPanel,
  },

  props: {
    ChatName: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      payload: {},
      messages: [
        { id: 1, userID: 2, type: "text", content: "Hello, Vue!" },
        {
          id: 2,
          userID: 2,
          type: "image",
          src: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1k3yxk.img?w=530&h=530&m=6&x=138&y=74&s=110&d=110",
        },
        { id: 3, userID: 1, type: "text", content: "Hello, Campfire!😁" },
        {
          id: 4,
          userID: 1,
          type: "task",
          title: "新任务",
          beginAt: "昨天",
          endAt: "今天",
        },
        {
          id: 5,
          userID: 2,
          type: "anno",
          title: "公告",
          beginAt: "昨天",
          endAt: "今天",
          content: "大家好！",
        },
      ],
    };
  },

  mounted() {
    setTimeout(() => {
      let bar = this.$refs.bar;
      let board = this.$refs.board;
      bar.scrollTo(0, board.clientHeight);
    }, 1000);
  },

  methods: {
    handleRend(payload) {
      console.log("New Event");
      this.payload = payload;
    },
    handleScroll(event) {
      if (event.scrollTop === 0) {
        console.log("Top");
        this.loadMoreMessages();
      }
    },
    loadMoreMessages() {
      // 在这里触发逻辑来拉取新的消息记录
      console.log("Load more messages");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

#panel {
  height: auto;
  display: flex;
  flex-direction: row;

  padding: 0;
  margin: 0;

  background-color: theme-color(background);
}

#chat {
  height: 100%;
  width: 75%;

  display: flex;
  flex-direction: column;
}

#board {
  height: 100%;
  width: 100%;
}

#chat-protocol {
  position: fixed;
  bottom: 5%;
  right: 20%;

  height: 10%;
  width: 50%;

  opacity: 0.5;

  #chatbar {
    height: 30px;
    width: 30%;

    margin-left: 10px;

    box-shadow: 0 -4px 8px 3px theme-color(text);

    border-radius: 10px 10px 10px 0;

    background-color: theme-color(background-upper);
  }

  .chatinput {
    height: 60%;
    width: 100%;

    box-sizing: border-box;
    padding: 10px;
    border: none;
    text-align: left;

    font-size: 1.5em;
    background-color: theme-color(background);
    resize: none;

    &:focus {
      outline: none;
    }
  }
  #submit {
    display: flex;
    box-sizing: border-box;
    box-shadow: 0 4px 8px 3px #000;

    border-radius: 10px;
    padding: 10px;
    width: 100%;
    align-items: center;
  }
}

#sub {
  width: 25%;
  border-style: solid;
  border-width: 1px;
  border-color: theme-color(text);
}
</style>
