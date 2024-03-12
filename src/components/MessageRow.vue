<script setup>
import { defineProps } from "vue";

defineProps({
  message: { type: Object, required: true },
  avatar: { type: String, default: "https://www.jarcheng.top/images/logo.jpg" },
});
</script>

<template>
  <div :class="['message-row', message.role === 'user' ? 'right' : 'left']">
    <!-- 消息展示条 -->
    <div class="row">
      <!-- 头像 -->
      <div class="avatar-wrapper">
        <el-avatar :src="avatar" class="avatar" shape="square" />
      </div>
      <!-- 消息内容 -->
      <div class="message">
        <!-- 预览模式,展示markdown -->
        <MdPreview
          :id="preview - only"
          :preview-theme="smart - blue"
          :model-value="message.content"
          v-if="message.content"
        ></MdPreview>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-row {
  display: flex;

  &.right {
    /* 消息显示在右侧 */
    justify-content: flex-end;

    .row {
      /* 头像也要靠右侧 */
      .avatar-wrapper {
        display: flex;
        justify-content: flex-end;
      }

      /* 用户回复的消息和ChatGPT回复的消息背景颜色做区分 */
      .message {
        background-color: rgb(231, 248, 255);
      }
    }
  }

  /* 默认靠左边显示 */
  .row {
    .avatar-wrapper {
      .avatar {
        box-shadow: 20px 20px 20px 3px rgba(0, 0, 0, 0.03);
        margin-bottom: 20px;
      }
    }

    .message {
      font-size: 15px;
      padding: 1.5px;
      /* 限制消息展示的最大宽度 */
      max-width: 500px;
      /* 圆润一点 */
      border-radius: 7px;
      /* 给消息框加一些描边，看起来更加实一些，要不然太扁了轻飘飘的。 */
      border: 1px solid rgba(black, 0.1);
      /* 增加一些阴影看起来更加立体 */
      box-shadow: 20px 20px 20px 1px rgba(0, 0, 0, 0.01);
    }
  }
}

/* 调整markdown组件的一些样式，deep可以修改组件内的样式，正常情况是scoped只能修改本组件的样式。 */
:deep(.md-editor-preview-wrapper) {
  padding: 0 10px;

  .smart-blue-theme p {
    line-height: unset;
  }
}
</style>
