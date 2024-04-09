<template>
  <element id="chat-panel" @click="handleWindowClick">
    <OverlayWindow v-show="showCreatePanel">
      <CreateCampPanel @close="showCreatePanel = false" />
    </OverlayWindow>
    <section id="list">
      <div class="top">
        <section class="top-left">
          <div>
            <Memo class="panel-icon" />
          </div>
          <div>
            <user class="panel-icon" />
          </div>
        </section>
        <div>
          <Plus class="panel-icon" @click="showCreatePanel = true" />
        </div>
      </div>
      <el-skeleton :loading="!isListLoaded" animated>
        <template #template>
          <div
            v-for="index in 11"
            :key="index"
            class="camp-brief"
            style="border: none"
          >
            <el-skeleton-item
              variant="circle"
              style="width: 50px; height: 50px"
            />
            <el-skeleton-item variant="h4" />
          </div>
        </template>
        <template #default>
          <el-scrollbar height="100%">
            <div
              v-for="(camp, index) in camps"
              :key="index"
              class="camp-brief"
              :class="{ active: currentCamp.index === index }"
              @click="selectCamp(index)"
            >
              <Avatar v-if="camp.isPrivate" :user="camp.opposite.user.id" />
              <el-avatar v-else><Coffee /></el-avatar>
              <h4>
                {{ camp.isPrivate ? camp.opposite.user.username : camp.name }}
              </h4>
              <el-badge
                :value="camp.unread"
                style="margin-left: auto"
              ></el-badge>
            </div>
          </el-scrollbar>
        </template>
      </el-skeleton>
    </section>
    <h1 v-if="isDefault" id="no-chat">Hello,&nbsp;<span>Campfire</span>!😊</h1>
    <section
      v-else
      id="chat"
      v-loading="!isMessageLoaded"
      element-loading-background="white"
    >
      <div id="board" :class="{ 'md-board': md }">
        <el-scrollbar ref="bar" @scroll="handleScroll">
          <div ref="board">
            <Message
              v-for="msg in currentCamp.messages"
              ref="messages"
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
          preview-theme="vuepress"
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
        />
        <div class="md-control">
          <CloseBold
            color="white"
            class="panel-icon"
            @click="toggleMarkdownMode"
          />
          <p ref="emoji" style="font-size: 20px">😊</p>
          <Promotion
            color="white"
            class="panel-icon"
            @click="handleMarkdownSend"
          />
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
        <el-divider direction="vertical"></el-divider>
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

        <Button label="发送" colored @click="handleSend" />
      </div>
    </section>
    <div v-show="showEmojiPanel" ref="epanel" class="emoji-panel">
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
      ref="imageUploader"
      type="file"
      name="imageToUpload"
      hidden
      accept="image/*"
      @change="handleImgUpload"
    />
    <input
      ref="fileUploader"
      type="file"
      name="fileToUpload"
      hidden
      @change="handleFileUpload"
    />
  </element>
</template>

<script>
import ChatMessage from "./Messages/ChatMessage.vue";
import RegularButton from "../RegularButton.vue";
import OverlayWindow from "../OverlayWindow.vue";
import CreateCampPanel from "../Camp/CreateCampPanel.vue";
import Avatar from "../Avatar.vue";
import { UserAPI, FileAPI, CampAPI, ProjectAPI } from "@/scripts/api.js";
import { CurrentUser, EventTypes } from "@/scripts/session.js";
import { eventBus } from "@/scripts/EventBus.js";
import { cache } from "@/scripts/Cache.js";
import { emoji } from "@/scripts/emoji.js";
import { ElMessage } from "element-plus";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export default {
  name: "ChatPanel",

  components: {
    Message: ChatMessage,
    Button: RegularButton,
    OverlayWindow,
    CreateCampPanel,
    MdEditor,
    Avatar,
  },

  props: {
    md: {
      type: Boolean,
    },
  },

  data() {
    return {
      currentUserID: CurrentUser.id,
      totalUnread: 0,
      payload: {},
      camps: [],
      currentCamp: {
        id: 0,
        messages: [],
      },

      emojis: emoji,
      toSendMD: "",
      toSend: "",

      isListLoaded: false,
      isMessageLoaded: false,
      isDefault: true,

      showEmojiPanel: false,
      showCreatePanel: false,
    };
  },

  created() {
    eventBus.subscribe("rend", this.handleRend);
    eventBus.subscribe("toprivate", this.toPrivate);
    eventBus.subscribe("message", this.handleNewMessage);
    this.fetchCampData();
  },

  beforeDestroy() {
    eventBus.unsubscribe("rend", this.handleRend);
    eventBus.unsubscribe("toprivate", this.toPrivate);
    eventBus.unsubscribe("message", this.handleNewMessage);
  },

  watch: {
    isMessageLoaded(newValue) {
      if (newValue === true) {
        setTimeout(() => {
          let bar = this.$refs.bar;
          let board = this.$refs.board;
          bar.scrollTo(0, board.clientHeight);
        }, 50);
      }
    },
  },

  methods: {
    handleWindowClick(event) {
      if (!this.$refs.emoji) {
        return;
      }
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

    fetchMessageData() {
      this.isMessageLoaded = false;
      this.currentMessageRecord = cache.msgCache.get(this.currentCamp.id);
      this.isMessageLoaded = true;
    },

    fetchCampData() {
      this.isListLoaded = false;
      Promise.all([UserAPI.privateCamps(), UserAPI.publicCamps()]).then(
        (responses) => {
          const privateCampsResponse = responses[0];
          const publicCampsResponse = responses[1];
          console.log(privateCampsResponse);
          console.log(publicCampsResponse);

          this.camps = privateCampsResponse.data.concat(
            publicCampsResponse.data
          );

          this.isListLoaded = true;
        }
      );
    },

    handleRend(payload) {
      this.payload = payload;
    },

    toPrivate(member) {
      let index = -1;
      this.camps.forEach((camp, i) => {
        if (camp.isPrivate && camp.opposite.userID === member.user.id) {
          index = i;
          return;
        }
      });

      if (index === -1) {
        let camp = {
          projID: this.currentCamp.projID,
          isPrivate: true,
          name: "private",
          membersID: [member.user.id],
          opposite: member,
        };
        ProjectAPI.createCamp(camp)
          .then((response) => {
            camp.id = response.data.id;
            this.camps.push(camp);
            this.toPrivate(member.user.id);
          })
          .catch((error) => {
            console.error(error);
            ElMessage.error("跳转失败");
          });
      } else {
        this.selectCamp(index);
      }
    },

    handleScroll(event) {
      if (event.scrollTop === 0) {
        console.log("Top");
        this.loadMoreMessages();
      }
    },

    createCamp() {},

    selectCamp(index) {
      this.isDefault = false;
      this.isMessageLoaded = false;
      this.camps[index].unread = undefined;
      CampAPI.campInfo(this.camps[index].id).then((response) => {
        this.currentCamp = response.data;
        this.currentCamp.index = index;

        if (this.currentCamp.isPrivate) {
          eventBus.publish("rend", this.camps[index].opposite.user, "user");
        } else {
          eventBus.publish("rend", this.currentCamp, "camp");
        }
        this.isMessageLoaded = true;
        console.log(response.data);
      });
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

    handleNewMessage(message) {
      let index = this.camps.findIndex(
        (camp) => camp.id == message.data.campID
      );
      this.camps[index].unread += 1;
    },

    handleSend() {
      if (this.toSend == "") {
        ElMessage.error("不可发送空消息");
        return;
      }
      this.showEmojiPanel = false;
      let msg = {
        eType: EventTypes().TextMessageEvent,
        content: this.toSend,
        ownerID: CurrentUser.id,
        campID: this.currentCamp.id,
        timestamp: new Date().toISOString(),
      };
      CurrentUser.session.send(msg);
      this.currentCamp.messages.push(msg);
      this.toSend = "";
    },

    handleMarkdownSend() {
      if (this.toSendMD == "") {
        ElMessage.error("不可发送空消息");
        return;
      }
      this.showEmojiPanel = false;
      let msg = {
        eType: EventTypes().MarkdownMessageEvent,
        content: this.toSendMD,
        ownerID: CurrentUser.id,
        campID: this.currentCamp.id,
        timestamp: new Date().toISOString(),
      };
      CurrentUser.session.send(msg);
      this.currentCamp.messages.push(msg);
      this.toSendMD = "";
    },

    handleImgUpload(event) {
      for (let i = 0; i < event.target.file.length; i++) {
        const newImg = new Blob([event.target.files[i]], {
          type: event.target.files[i].type,
        });
        FileAPI.uploadImg(newImg).then((response) => {
          if (response.data.res === "success") {
            ElMessage.success("图片发送成功");
          } else {
            ElMessage.error("图片发送失败");
          }
        });
      }
    },

    handleFileUpload(event) {
      for (let i = 0; i < event.target.file.length; i++) {
        const newFile = new Blob([event.target.files[i]], {
          type: event.target.files[i].type,
        });
        FileAPI.uploadImg(newFile).then((response) => {
          if (response.data.res === "success") {
            ElMessage.success("文件上传成功");
          } else {
            ElMessage.error("文件上传失败");
          }
        });
      }
    },

    uploadImages() {
      this.$refs.imageUploader.click();
    },

    uploadFiles() {
      this.$refs.imageUploader.click();
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

    .camp-brief,
    .top,
    .top div {
      opacity: 0;
    }
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

    .top {
      height: 40px;
      width: 100%;

      border-bottom: 1px solid theme-color(border);
      background-color: theme-color(background-upper);

      padding: 0 10px;

      box-sizing: border-box;

      display: grid;
      grid-template-columns: 8fr 1fr;

      div {
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: theme-color(theme-upper);
          color: theme-color(white);
        }
      }

      .top-left {
        display: flex;
        flex-direction: row;
        gap: 10px;
      }

      .panel-icon {
        height: 25px;

        border-radius: 8px;
      }
    }

    .camp-brief {
      height: 5em;
      width: 100%;

      display: flex;
      flex-direction: row;
      align-items: center;

      box-sizing: border-box;
      padding: 10px;

      border-color: theme-color(text);
      border-top: 1px solid theme-color(border);
      border-bottom: 1px solid theme-color(border);
      margin-bottom: -1px;

      transition: all 0.1s;
      gap: 10px;

      cursor: pointer;

      * {
        margin: 0;
      }

      &:hover {
        background-color: theme-color(background-upper);
      }

      &.active {
        background-color: theme-color(background);
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

#no-chat {
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;

  span {
    color: theme-color(theme);
  }
}

#board {
  height: 90%;
  width: 100%;

  transition: height 0.3s;
}

.md-editor {
  height: 100% !important;
}

.md-submit {
  height: 50%;
  width: 100%;

  display: flex;

  transition: height 0.3s;

  text-align: left;
}

.md-control {
  width: 30px;
  display: flex !important;
  flex-direction: column;
  background-color: theme-color(junior);
  gap: 2px;

  *:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

#submit {
  margin-top: 1%;
  position: relative;
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
</style>
