<template>
  <element id="search" @click.stop>
    <Search id="search-icon" />
    <input
      type="text"
      v-model="query"
      @input="handleInput"
      :placeholder="placeholder"
    />
    <div v-if="showResults" class="search-results">
      <ul>
        <li v-for="result in results" :key="result.id">{{ result.text }}</li>
      </ul>
    </div>
  </element>
</template>

<script>
export default {
  name: "SearchBox",
  props: {
    value: String,
    placeholder: {
      type: String,
      default: "Search...",
    },
  },
  data() {
    return {
      query: this.value || "",
      showResults: false,
      results: [],
    };
  },
  methods: {
    handleInput() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.handleSearch();
      }, 700);
    },
    handleSearch() {
      this.$emit("search", this.query);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";

#search {
  position: fixed;
  top: 200px;
  left: 32%;

  height: 70px;
  width: 33%;

  display: flex;
  flex-direction: row;
  gap: 20px;

  box-sizing: border-box;
  padding: 20px;

  align-items: center;

  border: 1px solid theme-color(text);
  border-radius: 50px;

  background-color: theme-color(white);

  margin: 10px;

  #search-icon {
    height: 20px;
    width: 20px;
  }

  input {
    background-color: rgba(255, 255, 255, 0);
    border: none;

    font-size: 24px;
    &:focus {
      outline: none;
    }
  }

  button {
    height: 100%;

    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;

    padding: 0;
    margin: 0;
    border: 0;
  }
}
</style>
