<template>
  <element>
    <section id="chat">
      <div>
        <h2>{{ ChatName }}</h2>
      </div>
      <div></div>
      <div></div>
    </section>
    <section id="sub"></section>
  </element>
</template>

<script>
export default {
  name: "ChatPanel",

  props: {
    ChatName: {
      type: String,
      required: true,
    },
  },
};
</script>
