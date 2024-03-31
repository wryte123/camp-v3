<template>
  <el-scrollbar style="height: 300px; width: 100%">
    <element id="branches">
      <div
        v-for="branch in branches"
        :key="branch.id"
        class="branch"
      >
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
        <div v-show="branch.isMain">
          主要
        </div>
        <small>最后更新于{{ branch.begin }}</small>
      </div>
    </element>
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      branches: [
        {
          id: 1,
          name: "main",
          isMain: true,
          begin: 13,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

#branches {
  height: 300px;
  width: 100%;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  padding: 10px;

  * {
    margin: 0;
  }
}

.branch {
  height: 15%;
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
}
</style>
