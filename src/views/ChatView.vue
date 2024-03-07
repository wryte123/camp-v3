<script setup></script>

<template>
  <!-- 最外层窗口  -->
  <div class="home-view">
    <!-- 整个聊天面板 -->
    <div class="chat-panel">
      <!-- 聊天面板左侧工具栏 -->
      <div class="tool-sidepanel">
        <div class="title">123123</div>
        <div class="description">123123123</div>
      </div>
      <!-- 聊天面板右侧聊天内容 -->
      <div class="message-panel"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  display: flex;
  justify-content: center;
  /* 聊天面板 */
  .chat-panel {
    display: flex;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 0 20px 20px #0000000d;
    margin-top: 70px;
    /* 左侧面板 */
    .tool-sidepanel {
      background-color: rgb(231, 248, 255);
      width: 300px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      padding: 20px;
      position: relative;
      border-right: 1px solid rgba(black, 0.07);
      .title {
        margin-top: 20px;
        font-size: 20px;
      }
      .description {
        color: rgba(black, 0.07);
        margin-top: 10px;
        font-size: 10px;
      }
    }
    .message-panel {
      width: 700px;
      height: 800px;
    }
  }
}
</style>
