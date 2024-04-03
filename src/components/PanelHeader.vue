<template>
  <element class="header-main">
    <h1>{{ title }}</h1>
    <p>
      <i>{{ text }}</i>
    </p>
    <div class="header-panel" v-show="filter || manage">
      <div v-show="filter" class="filter">
        <input type="text" placeholder="输入过滤关键词..." />
      </div>
      <div v-show="manage" class="switch">
        <el-checkbox @change="onChange" size="large" label="管理模式" />
      </div>
    </div>
  </element>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    manage: {
      type: Boolean,
      default: true,
    },
    filter: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onChange() {
      this.$emit("manage");
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

.header-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  box-sizing: border-box;
  align-items: flex-start;

  border-left: 1px solid theme-color(border);
  * {
    margin: 0;
  }

  h1 {
    font-size: 48px;
  }

  .header-panel {
    width: 100%;
    display: grid;
    grid-template-columns: 9fr 150px;
    grid-template-rows: 50px;
    gap: 40px;
  }

  .filter {
    height: 100%;
    border-radius: 10px;
    border: 1px solid theme-color(border);

    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 0 10px;

    input {
      border: none;

      &:focus {
        outline: none;
      }
    }
  }

  .switch {
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;

    align-items: center;
    justify-content: center;
  }
}
</style>
