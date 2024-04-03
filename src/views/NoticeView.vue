<template>
  <main>
    <Bar />
    <section id="notice-main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a @click="this.$router.push('/')">Campfire</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item
          ><a @click="this.$router.push('/projects')"
            >通知</a
          ></el-breadcrumb-item
        >
      </el-breadcrumb>
      <PanelHeader
        tab="filter"
        title="通知"
        text="列出了所有的通知，包括系统通知，成员邀请等信息。 "
        :manage="false"
      />
      <div id="notices">
        <div
          v-for="(notice, index) in notices"
          :key="index"
          class="notice-item"
        >
          <div class="item-start">
            <TinyUserCard :user="getOperator" />
            <p>邀请您加入Campfire</p>
          </div>
          <div></div>
          <div class="item-end">
            <div class="icon-button accept">
              <Check class="nav-icon" />
            </div>
            <div class="icon-button refuse">
              <Close class="nav-icon" />
            </div>
          </div>

          <button v-show="isManageMode" class="delete" @click="refuseNotice">
            <el-icon><Delete color="white" /></el-icon>
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import TinyUserCard from "@/components/User/TinyUserCard.vue";
import PanelHeader from "@/components/PanelHeader.vue";
// import { UserAPI } from "@/scripts/api.js";
// import { ElMessage } from "element-plus";

export default {
  components: {
    Bar: SideBar,
    TinyUserCard,
    PanelHeader,
  },

  data() {
    return {
      notices: [{}],
      isManageMode: false,
      isLoaded: false,
    };
  },

  created() {
    this.noticesOfUser();
  },

  methods: {
    noticesOfUser() {
      //   UserAPI.notices().then((response) => {
      //     if (response.data.length == 0) {
      //       this.isLoaded = true;
      //       return;
      //     }
      //     this.projects = response.data;
      //     this.isLoaded = true;
      //     console.log(this.projects);
      //   });
    },
    acceptInvitation() {},
    refuseInvitation() {},
    getOperator() {},
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

main {
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: row;
}

#notice-main {
  width: 100%;
  height: 100%;
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h1 {
    font-size: 48px;
  }

  h1,
  h2 {
    text-align: left;
  }

  p {
    text-align: left;
  }

  .end {
    margin-left: auto;

    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }

  #notices {
    box-sizing: border-box;
    padding: 20px;
    border-left: 1px solid theme-color(border);
    border-right: 1px solid theme-color(border);
    display: flex;
    flex-direction: column;
    gap: 15px;

    .notice-item {
      width: 100%;
      height: 100px;
      border: 1px solid theme-color(border);
      border-radius: 10px;

      display: flex;
      flex-direction: row;

      * {
        margin: 0;
      }

      .item-start {
        width: 90%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px;
        gap: 10px;
      }

      .item-end {
        width: 10%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        box-sizing: border-box;
        gap: 10px;
        padding: 10px 20px;
      }

      transition: box-shadow 0.1s, left 1s ease-in, top 1s ease-in;

      &:hover {
        box-shadow: 2px 2px 3px 3px theme-color(border);
      }
    }
  }
}

.accept {
  background-color: green;
}

.refuse {
  background-color: red;
}
</style>
