<template>
  <element>
    <section id="chat">
      <div id="topbar">
        <h2>ChatName</h2>
      </div>
      <div id="board">
        <Message v-for="msg in messages" :key="msg.id" :message="msg" />
      </div>
      <div id="chatpanel">
        <div id="chatbar"></div>
        <div id="input" contenteditable="true"></div>
        <div id="submit"></div>
      </div>
    </section>
    <section id="sub"></section>
  </element>
</template>

<script>
import ChatMessage from "./Messages/ChatMessage.vue";

export default {
  name: "ChatPanel",

  components: {
    Message: ChatMessage,
  },

  props: {
    ChatName: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      messages: [
        { id: 1, type: "text", content: "Hello, Vue!" },
        {
          id: 2,
          type: "image",
          src: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1k3yxk.img?w=530&h=530&m=6&x=138&y=74&s=110&d=110",
        },
        { id: 3, type: "text", content: "Hello, Campfire!" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

element {
  display: flex;
  flex-direction: row;
}

#chat {
  height: 100%;
  width: 80%;

  display: flex;
  flex-direction: column;

  border-style: solid;
  border-width: 1px;
  border-color: theme-color(text);
}

#topbar {
  height: 5%;
  width: 100%;

  border-style: solid;
  border-width: 1px;
  border-color: theme-color(text);

  box-sizing: border-box;

  padding: 0.5em;

  h2 {
    margin: 0;
  }
}

#board {
  height: 70%;
  width: 100%;

  border-style: solid;
  border-width: 1px;
  border-color: theme-color(text);

  overflow-y: scroll;
}

#chatpanel {
  height: 30%;
  width: 100%;

  #chatbar {
    height: 30px;
    width: 100%;

    border-style: solid;
    border-width: 1px;
    border-color: theme-color(text);
  }

  #input {
    height: 70%;
    width: 100%;

    border-style: solid;
    border-width: 1px;
    border-color: theme-color(text);
  }

  #submit {
    width: 100%;
  }
}

#sub {
  width: 20%;
  border-style: solid;
  border-width: 1px;
  border-color: theme-color(text);
}
</style>
