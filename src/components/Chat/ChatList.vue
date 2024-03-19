<template>
  <element>
    <el-scrollbar height="100vh">
      <div v-for="(item, index) in dataList" :key="index" class="camp-brief">
        <el-avatar></el-avatar>
        <div>
          <h3>{{ item.name }}</h3>
          <p>收到{{ item.newMessageCount }}条新消息</p>
        </div>
      </div>
    </el-scrollbar>
  </element>
</template>

<script>
export default {
  name: "ChatList",
  data() {
    return {
      dataList: [
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
    };
  },

  async created() {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
element {
  margin: 0;

  display: flex;
  flex-direction: column;

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

    background-color: theme-color(background-upper);

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
</style>
