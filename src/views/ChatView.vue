<script setup></script>

<template>
  <div class="chat-view">
    <!-- 总 -->
    <div class="chat-panel">
      <div class="function-panel"></div>
      <div class="message-panel"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-view {
  display: flex;
  /* 与窗口同宽 */
  width: 100vw;
  /* 水平方向上剧中 */
  justify-content: center;

  .chat-panel {
    /* 聊天面板flex布局，让会话列表和聊天记录左右展示 */
    display: flex;
    /* 让聊天面板圆润一些 */
    border-radius: 20px;
    background-color: white;
    /* 给一些阴影 */
    box-shadow: 0 0 20px 20px rgba(black, 0.05);
    /* 与上方增加一些间距 */
    margin-top: 70px;
    /* 左侧聊天会话面板*/
    .function-panel {
      background-color: #d9f2bf;
      width: 300px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      padding: 20px;
      position: relative;
      border-right: 1px solid rgba(black, 0.07);
    }
    .message-panel {
      width: 700px;
      height: 800px;
    }
  }
}
</style>
