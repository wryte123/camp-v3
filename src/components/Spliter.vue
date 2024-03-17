<template>
  <element>
    <div
      v-for="(window, index) in windows"
      :key="index"
      class="window"
      :style="{ top: `${window.top}px`, left: `${window.left}px` }"
      @mousedown="startDrag(index, $event)"
    >
      <div class="drag-handle"><More /></div>
      <h3>{{ window.name }}</h3>
      <component :is="window.component"></component>
    </div>
  </element>
</template>

<script>
import ProjectPart from "./Project/ProjectPart.vue";

export default {
  data() {
    return {
      windows: [
        { top: 50, left: 50, component: "ComponentA", name: "窗口1" },
        { top: 150, left: 300, component: "ComponentB", name: "窗口2" },
      ],
      dragging: null,
    };
  },
  components: {
    ComponentA: {
      ProjectPart: ProjectPart,
    },
    ComponentB: {
      /* 定义ComponentB */
    },
  },
  methods: {
    startDrag(index, event) {
      this.dragging = index;
      event.preventDefault();
      event.stopPropagation();
      document.addEventListener("mousemove", this.drag);
      document.addEventListener("mouseup", this.stopDrag);
    },
    drag(event) {
      const draggedWindow = this.windows[this.dragging];
      // 计算新的位置
      const newX = event.clientX - draggedWindow.width / 2;
      const newY = event.clientY - draggedWindow.height / 2;
      // 更新窗口位置
      draggedWindow.left = newX;
      draggedWindow.top = newY;
    },
    stopDrag() {
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.stopDrag);
      this.dragging = null;

      // 检查是否与目标窗口重叠，并执行位置交换
      this.checkOverlapAndSwap();
    },
    checkOverlapAndSwap() {
      const draggedWindow = this.windows[this.dragging];
      for (let i = 0; i < this.windows.length; i++) {
        if (i !== this.dragging) {
          const targetWindow = this.windows[i];
          if (this.isOverlapping(draggedWindow, targetWindow)) {
            // 交换位置
            [this.windows[this.dragging], this.windows[i]] = [
              this.windows[i],
              this.windows[this.dragging],
            ];
            break; // 如果只需要与第一个重叠的窗口交换，则退出循环
          }
        }
      }
    },
    isOverlapping(window1, window2) {
      // 检查两个窗口是否重叠
      const x1 = window1.left;
      const y1 = window1.top;
      const x2 = window2.left;
      const y2 = window2.top;

      // 检查窗口的边界是否相交
      return (
        x1 < x2 + window2.width &&
        x1 + window1.width > x2 &&
        y1 < y2 + window2.height &&
        y1 + window1.height > y2
      );
    },
  },
};
</script>

<style lang="scss" scoped>
element {
  position: relative;

  display: flex;
  flex-direction: row;
}

.window {
  width: 50%;
  height: 100%;
  border: 1px solid #ccc;
  background-color: #fff;
  user-select: none;
}

.drag-handle {
  position: relative;
  top: 0;
  left: 50%;
  width: 20px;
  height: 20px;
  cursor: move;
}
</style>
