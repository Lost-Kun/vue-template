<template>
  <div class="analysis">
    <div class="left">
      <div class="entityBox">
        <div class="entity">
          <i class="iconfont icon-biaotitubiao"></i>&nbsp;
          <el-tooltip :content="selectedEntity.showName" placement="bottom">
            <span>{{selectedEntity.showName}}</span>
          </el-tooltip>
        </div>
        <div class="backSearch">
          <el-tooltip content="返回搜索页" placement="right">
            <i
              class="iconfont icon-fanhui backIcon"
              @click="backToSearch"
            >
            </i>
          </el-tooltip>
        </div>
      </div>
      <div class="catalog">
        <el-menu
          :default-active="selectedMenuIndex"
          @select="menuSelect"
          @open="openSubMenu"
        >
          <el-menu-item
            index="菜单1"
            :key="'menu1'"
          >
            <i class="el-icon-menu" style="margin-right:9px;font-size:17px;"></i>
            <span slot="title">菜单1</span>
          </el-menu-item>
          <el-menu-item
            index="菜单2"
            :key="'menu2'"
          >
            <i class="el-icon-menu" style="margin-right:9px;font-size:17px;"></i>
            <span slot="title">菜单2</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="right">
      <div class="analysis_title">
          <i
            class="el-icon-location"
            style="margin:0 10px 0 20px;font-size:16px;color:#FF5858;"
          >
          </i>{{selectedMenuIndex}}
      </div>
      <div class="analysis_content">
        <component
          v-bind:is="currentView"
        >
        </component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedEntity: {},
      selectedMenuIndex: '菜单1',
      currentView: '',
    };
  },
  created() {
    const selectedEntity = JSON.parse(sessionStorage.getItem('selectedEntity_pinduoduo'));
    if (selectedEntity && selectedEntity.name) {
      selectedEntity.showName = selectedEntity.name;
      this.selectedEntity = selectedEntity;
      this.$store.commit('SET_SELECTEDENTITY', selectedEntity);
      this.selectFirstMenu();
    } else {
      this.backToSearch();
    }
  },
  methods: {
    backToSearch() {
      this.$router.push('/{{ root_path }}/search');
    },
    selectFirstMenu() {
    },
    menuSelect(index, indexPath) {
      // 切换组件
      this.selectedMenuIndex = index;
      console.log(indexPath);
    },
    openSubMenu(index) {
      // 展开subMenu
      console.log(index);
    },
  },
};
</script>

<style lang="less" scoped>
.analysis {
  position: relative;
  height: 100%;

  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 250px;
    bottom: 0;
    border-right: 1px solid #ebebeb;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.2);

    .entityBox {
      position: relative;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #ebebeb;

      .entity {
        position: absolute;
        top: 0;
        right: 50px;
        bottom: 0;
        left: 15px;
        text-align: left;
        font-size: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .backSearch {
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        bottom: 0;

        .backIcon {
          font-size: 22px;
          color: #8A8A8A;
          cursor: pointer;
        }

        .backIcon:hover {
          color: #409EFF;
        }
      }
    }

    .catalog {
      position: absolute;
      top: 46px;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: left;
      overflow-y: auto;

      .el-menu {
        border: 0;
      }
    }
  }

  .right {
    position: absolute;
    top: 0;
    left: 250px;
    right: 0;
    bottom: 0;

    .analysis_title {
      height: 45px;
      line-height: 45px;
      font-size: 15px;
      text-align: left;
      border-bottom: 1px solid #ebebeb;
    }

    .analysis_content {
      position: absolute;
      top: 45px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
