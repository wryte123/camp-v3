<template>
  <element id="branches">
    <el-scrollbar style="max-height: 300px">
      <div class="branches-main">
        <div v-for="branch in branches" :key="branch.id" class="branch">
          <div class="start">
            <svg
              width="24"
              height="24"
              viewBox="0 0 48 48"
              fill="none"
              class="panel-icon"
            >
              <path
                d="M19 10a4 4 0 11-8 0 4 4 0 018 0zM38 10a4 4 0 11-8 0 4 4 0 018 0zM19 38a4 4 0 11-8 0 4 4 0 018 0zM15 15v15m0 3.5V30m0 0c0-5 19-7 19-15"
                stroke="#4E5969"
                stroke-width="2"
              />
            </svg>
            <h3>{{ branch.name }}</h3>
            <div v-show="branch.isMain">主要</div>
          </div>
          <small>最后更新于{{ branch.updated }}</small>
        </div>
      </div>
    </el-scrollbar>
  </element>
</template>

<script>
import { formatTimeFromISO } from "@/scripts/utils";

export default {
  props: {
    branches: {
      type: Object,
    },
  },

  created() {
    this.time();
  },

  methods: {
    time() {
      this.branches.forEach((branch) => {
        branch.updated = formatTimeFromISO(branch.updated);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

#branches {
  min-height: 100px;
  max-height: 300px;
  width: 100%;

  box-sizing: border-box;

  * {
    margin: 0;
  }
}

.branches-main {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
}
.branch {
  height: 50px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 2px 10px;
  gap: 10px;

  border: 1px solid theme-color(border);
  border-radius: 10px;

  transition: background-color 0.1s, box-shadow 0.1s;

  &:hover {
    box-shadow: 3px 3px 5px 1px theme-color(border);
  }

  .start {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 70%;
  }
}
</style>
