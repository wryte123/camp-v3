<template>
  <element id="chat-panel">
    <section
      v-loading="!isListLoaded"
      element-loading-background="white"
      id="list"
    >
      <el-scrollbar height="100vh">
        <div v-for="(item, index) in camps" :key="index" class="camp-brief">
          <el-avatar></el-avatar>
          <div>
            <h4>{{ item.name }}</h4>
            <p>收到{{ item.newMessageCount }}条新消息</p>
          </div>
        </div>
      </el-scrollbar>
    </section>

    <section
      v-loading="!isMessageLoaded"
      element-loading-background="white"
      id="chat"
    >
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
      <div id="submit">
        <textarea
          v-model="toSend"
          class="chatinput"
          placeholder="输入消息..."
        />

        <p ref="emoji" @click="showEmojiPanel = true">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="#4E5969" />
            <path
              d="M18 17v6M30 17v6M16.582 28.105a8 8 0 0014.837 0"
              stroke="#fff"
              stroke-width="2"
            />
          </svg>
        </p>
        <div v-show="showEmojiPanel" class="emoji-panel">
          <el-scrollbar>
            <div id="inner">
              <button
                v-for="emoji in emojis"
                :key="emoji.name"
                @click="insertEmoji(emoji.symbol)"
              >
                {{ emoji.symbol }}
              </button>
            </div>
          </el-scrollbar>
        </div>
        <p @click="uploadImage"><Picture class="chat-icon" /></p>
        <p @click="toggleMarkdownMode">MD mode</p>

        <Button label="发送" @click="handleSend" />
      </div>
    </section>
    <input
      type="file"
      name="imageToUpload"
      hidden
      ref="imageUploader"
      accept="image/*"
      @change="handleUpload($event)"
    />
  </element>
</template>

<script>
import ChatMessage from "./Messages/ChatMessage.vue";
import RegularButton from "../RegularButton.vue";

export default {
  name: "ChatPanel",

  components: {
    Message: ChatMessage,
    Button: RegularButton,
  },

  data() {
    return {
      isListLoaded: false,
      isMessageLoaded: false,
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
          owner: "electric",
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
      camps: [
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
        { name: "老登交流群", newMessageCount: 1 },
      ],
      markdownMode: false,
      showEmojiPanel: false,
      emojis: [
        { name: "笑脸", symbol: "😄" },
        { name: "爱心", symbol: "❤️" },
        { name: "笑脸", symbol: "😄" },
        { name: "爱心", symbol: "❤️" },
        { name: "笑脸", symbol: "😄" },
        { name: "爱心", symbol: "❤️" },
        { name: "笑脸", symbol: "😄" },
        { name: "爱心", symbol: "❤️" },
        { name: "笑脸", symbol: "😄" },
        { name: "爱心", symbol: "❤️" },
        // ... 添加更多emoji
      ],
      toSend: "",
    };
  },

  mounted() {
    window.addEventListener("click", this.handleWindowClick);
    setTimeout(() => {
      let bar = this.$refs.bar;
      let board = this.$refs.board;
      bar.scrollTo(0, board.clientHeight);
    }, 1000);
  },

  beforeDestroy() {
    window.removeEventListener("click", this.handleWindowClick);
  },

  methods: {
    handleWindowClick(event) {
      const emojiPanel = this.$el.querySelector(".emoji-panel");
      if (
        this.showEmojiPanel &&
        !emojiPanel.contains(event.target) &&
        !this.$refs.emoji.contains(event.target)
      ) {
        this.hideEmojiPanel();
      }
    },

    // TODO:
    fetchMessageData() {
      this.isMessageLoaded = true;
    },

    fetchCampData() {
      this.isListLoaded = true;
    },

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
      this.fetchMessageData();
      console.log("Load more messages");
    },

    insertEmoji(emoji) {
      this.toSend += emoji;
      this.showEmojiPanel = false;
    },

    hideEmojiPanel() {
      this.showEmojiPanel = false;
    },

    toggleMarkdownMode() {},

    handleSend() {
      this.toSend == "";
      this.showEmojiPanel = false;
    },

    uploadImage() {
      this.$refs.imageUploader.click();
    },

    handleUpload() {},
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

.expanded {
  width: 50% !important;
}

#chat-panel {
  height: auto;
  display: flex;
  flex-direction: row;

  width: 100%;

  transition: width 0.2s;

  padding: 0;
  margin: 0;

  background-color: theme-color(white);

  #list {
    display: flex;
    flex-direction: column;

    width: 30%;

    .camp-brief {
      height: 5em;
      width: 100%;

      display: flex;
      flex-direction: row;
      align-items: center;

      box-sizing: border-box;
      padding: 10px;

      border-width: 1px;
      border-color: theme-color(text);

      transition: all 0.1s ease-in;
      gap: 10px;
      &:hover {
        background-color: theme-color(grey);
      }

      * {
        margin: 0;
      }

      div {
        justify-content: flex-start;

        text-align: left;
      }
    }
  }
}

#chat {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
}

#board {
  height: 100%;
  width: 100%;
}

#submit {
  position: relative;
  bottom: 5%;
  left: 5%;

  height: 7%;
  width: 90%;

  opacity: 0.5;

  display: flex;
  flex-direction: row;
  gap: 10px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px 3px #000;

  border-radius: 10px;
  padding: 10px;
  align-items: center;

  .chatinput {
    height: 100%;
    width: 100%;

    box-sizing: border-box;
    padding: 10px;
    border: none;
    text-align: left;
    font-family: "微软雅黑";

    font-size: 1em;
    background-color: theme-color(white);
    resize: none;

    &:focus {
      outline: none;
    }
  }
  .chat-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;

    transition: all 0.1s ease-in-out;

    border-radius: 3px;
  }

  p {
    height: 100%;
    display: flex;
    cursor: pointer;
    border-radius: 3px;

    justify-content: center;
    align-items: center;
    margin: 0;

    transition: all 0.1s ease-in-out;

    &:hover {
      background-color: theme-color(grey);
    }
  }
}

.emoji-panel {
  width: 20%;
  height: 100px;
  position: absolute;
  bottom: 100%;
  left: 65%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

  background-color: theme-color(grey);
  #inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    gap: 10px;

    button {
      padding: 10px 10px;
      border: none;
      border-radius: 5px;
      background-color: transparent;
      cursor: pointer;
    }
  }
}
</style>
