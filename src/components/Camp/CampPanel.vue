<template>
  <element id="camp-panel">
    <div id="camp-card">
      <h1>{{ rendData.name }}</h1>
      <div class="card-line">
        <el-icon><UserFilled /></el-icon>
        <p>{{ rendData.members.length }}名成员</p>
      </div>
      <div class="card-line">
        <el-icon><Check /></el-icon>
        <p>创建于{{ rendData.begin }}</p>
      </div>
      <el-divider />
      <div id="camp-opts">
        <div><CirclePlus class="panel-icon" />邀请</div>
        <div><Tickets class="panel-icon" />公告</div>
        <div><Edit class="panel-icon" />编辑</div>
        <div><Search class="panel-icon" />搜索</div>
        <div><Files class="panel-icon" />项目信息</div>
        <div><DocumentChecked class="panel-icon" />任务一览</div>
        <div><FolderOpened class="panel-icon" />源代码</div>
        <div><DataAnalysis class="panel-icon" />分析</div>
      </div>
    </div>

    <div id="member-panel">
      <el-scrollbar>
        <div id="members">
          <MemberCard
            v-for="member in rendData.members"
            :key="member.userId"
            :data="member"
          />
        </div>
      </el-scrollbar>
    </div>
  </element>
</template>

<script>
import { sortMembers } from "@/scripts/utils";
import MemberCard from "./MemberCard.vue";

export default {
  components: {
    MemberCard,
  },

  props: {
    rendData: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.sortMembers(this.rendData.members);
  },

  methods: {
    sortMembers(members) {
      sortMembers(members, this.rendData.owner.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/global.scss" as *;

#camp-panel {
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  height: 96%;
  width: 100%;

  #camp-card {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 20px;
    gap: 10px;

    * {
      margin: 0;
    }

    h1 {
      text-align: left;
    }

    .card-line {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 5px;
    }

    #camp-opts {
      min-width: 20%;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));

      div {
        height: 60px;
        width: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;

        cursor: pointer;
        border-radius: 8px;

        &:hover {
          background-color: theme-color(background-upper);
        }
      }
    }
  }

  #member-panel {
    height: 70%;
    width: 100%;

    border-top: 1px solid theme-color(border);
    border-bottom: 1px solid theme-color(border);

    #members {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

      box-sizing: border-box;
    }
  }
}
</style>
