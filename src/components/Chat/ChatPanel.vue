<template>
  <element id="chat-panel" @click="handleWindowClick">
    <section id="list">
      <div id="search-trigger" @click="this.showSearch = !this.showSearch">
        <Search id="search-trigger-icon" />
        <h4>搜索...</h4>
      </div>
      <div
        class="overlay"
        v-if="showSearch"
        @click="this.showSearch = !this.showSearch"
      >
        <component :is="showSearch ? 'Explorer' : ''"></component>
      </div>
      <el-skeleton loading="!isListLoaded" animated>
        <template #template>
          <div v-for="index in 11" :key="index" class="camp-brief">
            <el-skeleton-item
              variant="circle"
              style="width: 50px; height: 50px"
            />
            <div style="width: 200px; height: 100%">
              <el-skeleton-item variant="h4" />
            </div>
          </div>
        </template>
        <template #default>
          <el-scrollbar height="100%">
            <div v-for="(item, index) in camps" :key="index" class="camp-brief">
              <el-avatar></el-avatar>
              <div>
                <h4>{{ item.name }}</h4>
                <p>收到{{ item.newMessageCount }}条新消息</p>
              </div>
            </div>
          </el-scrollbar>
        </template>
      </el-skeleton>
    </section>

    <section
      v-loading="!isMessageLoaded"
      element-loading-background="white"
      id="chat"
    >
      <div id="board" :class="{ 'md-board': md }">
        <el-scrollbar ref="bar" @scroll="handleScroll" height="85vh">
          <div ref="board">
            <Message
              ref="messages"
              v-for="msg in messages"
              :key="msg.id"
              :message="msg"
            />
          </div>
        </el-scrollbar>
      </div>
      <div v-if="md" class="md-submit">
        <MdEditor
          v-model="toSendMD"
          :show-code-row-number="true"
          placeholder="请输入Markdown..."
          :toolbars-exclude="[
            'pageFullscreen',
            'fullscreen',
            'preview',
            'htmlPreview',
            'catalog',
            'github',
            'unorderedList',
            'orderedList',
            'task',
            'quote',
          ]"
          class="md-editor"
        />
        <div class="md-control">
          <CloseBold
            color="white"
            class="panel-icon"
            @click="toggleMarkdownMode"
          />
          <p ref="emoji" style="font-size: 20px">😊</p>
          <Promotion color="white" class="panel-icon" @click="sendMarkdown" />
        </div>
      </div>
      <div v-else id="submit">
        <textarea
          v-model="toSend"
          class="chatinput"
          placeholder="请输入消息..."
          preview="true"
          tabWidth="4"
        />
        <p ref="emoji" style="font-size: 20px">😊</p>
        <p @click="uploadImages">
          <svg class="chat-icon" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 33l9-9v9h-9zm0 0l-3.5-4.5L17 33h7zm15 8H9a2 2 0 01-2-2V9a2 2 0 012-2h30a2 2 0 012 2v30a2 2 0 01-2 2zM15 15h2v2h-2v-2z"
              stroke="#4E5969"
              stroke-width="2"
            />
            <path
              d="M33 33v-9l-9 9h9zM23.5 33l-3-4-3 4h6zM15 15h2v2h-2z"
              fill="#4E5969"
            />
          </svg>
        </p>
        <p @click="uploadFiles">
          <svg class="chat-icon" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 19v14m-7-7h14M6 13h18l-2.527-3.557a1.077 1.077 0 00-.88-.443H7.06C6.474 9 6 9.448 6 10v3zm0 0h33.882c1.17 0 2.118.895 2.118 2v21c0 1.105-.948 3-2.118 3H8.118C6.948 39 6 38.105 6 37V13z"
              stroke="#4E5969"
              stroke-width="2"
            />
          </svg>
        </p>
        <p @click="toggleMarkdownMode">MD mode</p>

        <Button label="发送" @click="handleSend" colored />
      </div>
    </section>
    <div ref="epanel" v-show="showEmojiPanel" class="emoji-panel">
      <el-scrollbar>
        <div id="inner">
          <button
            v-for="emoji in emojis"
            :key="emoji.name"
            @click="insertEmoji(emoji)"
          >
            {{ emoji }}
          </button>
        </div>
      </el-scrollbar>
    </div>
    <input
      type="file"
      name="imageToUpload"
      hidden
      ref="imageUploader"
      accept="image/*"
      @change="handleImgUpload"
    />
    <input
      type="file"
      name="fileToUpload"
      hidden
      ref="fileUploader"
      @change="handleFileUpload"
    />
  </element>
</template>

<script>
import Explorer from "../Explorer.vue";
import ChatMessage from "./Messages/ChatMessage.vue";
import RegularButton from "../RegularButton.vue";
import { UserAPI, FileAPI } from "@/scripts/api.js";
import { eventBus } from "@/scripts/EventBus.js";
import { cache } from "@/scripts/Cache.js";
import { emoji } from "@/scripts/emoji.js";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ElMessage } from "element-plus";

export default {
  name: "ChatPanel",

  components: {
    Message: ChatMessage,
    Button: RegularButton,
    MdEditor,
    Explorer,
  },

  props: {
    md: {
      type: Boolean,
    },
  },

  data() {
    return {
      showSearch: false,
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
      camps: [],
      currentCamp: {},
      showEmojiPanel: false,
      emojis: emoji,
      toSendMD: "",
      toSend: "",
    };
  },

  created() {
    eventBus.subscribe("rend", this.handleRend);
  },

  mounted() {
    setTimeout(() => {
      let bar = this.$refs.bar;
      let board = this.$refs.board;
      bar.scrollTo(0, board.clientHeight);
    }, 1000);
    this.fetchCampData();
    this.fetchMessageData();
  },

  beforeDestroy() {
    eventBus.unsubscribe("rend", this.handleRend);
  },

  methods: {
    handleWindowClick(event) {
      const emojiRect = this.$refs.emoji.getBoundingClientRect();
      const emojiLeft = emojiRect.left;
      const emojiTop = emojiRect.top;
      if (!this.$refs.emoji.contains(event.target)) {
        this.showEmojiPanel = false;
      } else {
        this.showEmojiPanel = true;
        this.$refs.epanel.style.left = `${emojiLeft}px`;
        this.$refs.epanel.style.top = `${emojiTop - 131}px`;
      }
    },

    async fetchMessageData() {
      this.isMessageLoaded = false;
      this.currentMessageRecord = cache.msgCache.get(this.currentCamp.id);
      this.isMessageLoaded = true;
    },

    async fetchCampData() {
      this.isListLoaded = false;
      const privates = await UserAPI.privateCamps();
      const publics = await UserAPI.publicCamps();
      this.camps = privates + publics;
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
      if (this.md == true) {
        this.toSendMD += emoji;
      } else {
        this.toSend += emoji;
      }

      this.showEmojiPanel = false;
    },

    toggleMarkdownMode() {
      this.$emit("mdtoggle");
    },

    handleSend() {
      this.toSend = "";
      this.showEmojiPanel = false;
    },

    handleMarkdownSend() {
      this.toSendMD = "";
      this.showEmojiPanel = false;
    },

    uploadImages() {
      this.$refs.imageUploader.click();
    },

    uploadFiles() {
      this.$refs.imageUploader.click();
    },

    handleImgUpload(event) {
      for (let i = 0; i < event.target.file.length; i++) {
        const newImg = new Blob([event.target.files[i]], {
          type: event.target.files[i].type,
        });
        const response = FileAPI.uploadImg(newImg);
        if (response.data.success) {
          ElMessage.success("图片发送成功");
        } else {
          ElMessage.error("图片发送失败");
        }
      }
    },

    handleFileUpload(event) {
      for (let i = 0; i < event.target.file.length; i++) {
        const newFile = new Blob([event.target.files[i]], {
          type: event.target.files[i].type,
        });
        const response = FileAPI.uploadFile(newFile);
        if (response.data.success) {
          ElMessage.success("文件上传成功");
        } else {
          ElMessage.error("文件上传失败");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.expanded {
  width: 60% !important;

  #list {
    width: 0% !important;
  }
  .md-submit {
    height: 50% !important;
    width: 100% !important;
  }

  .md-board {
    height: 50% !important;
  }
}

#chat-panel {
  z-index: 900;

  height: 100%;
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

    width: 400px;
    transition: width 0.1s;

    border-right: 1px solid theme-color(border);
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

      transition: all 0.1s;
      gap: 10px;
      &:hover {
        background-color: theme-color(grey);
      }

      * {
        margin: 0;
      }

      div {
        display: flex;
        flex-direction: column;
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

  transition: height 0.3s;
}

.md-editor {
  height: 100% !important;
}

.md-submit {
  height: 50%;
  width: 30%;

  display: flex;

  transition: height 0.3s;
}

.md-control {
  width: 30px;
  display: flex !important;
  flex-direction: column;
  background-color: theme-color(text);
  gap: 2px;

  *:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

#submit {
  position: relative;
  bottom: 20px;
  left: 10%;
  height: 70px;
  width: 80%;

  opacity: 0.5;

  display: flex;
  flex-direction: row;
  gap: 10px;
  box-sizing: border-box;
  border: 1px solid theme-color(border);

  background-color: white;
  opacity: 1;

  border-radius: 10px;
  padding: 10px;
  align-items: center;

  transition: width 0.1s, left 0.1s;

  .chatinput {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: none;
    text-align: left;
    font-family: "微软雅黑";

    font-size: 1em;
    background-color: white;
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
  width: 200px;
  height: 100px;
  position: absolute;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  opacity: 0.7;

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

#search-trigger {
  min-width: 250px;

  max-height: 40px;

  border-bottom: 1px solid theme-color(border);
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;

  #search-trigger-icon {
    height: 20px;
    width: 20px;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}
</style>
