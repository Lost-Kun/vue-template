<template>
  <div class="search">
    <div class="searchBox">
      <div class="center_container">
        <el-input
          v-model="searchText"
          @keyup.enter.native="fuzzyQuery"
          :placeholder="placeholder_search"
        >
          <el-button
          slot="append"
          type="primary"
          @click="fuzzyQuery"
          :loading="isSearching"
          icon="el-icon-search">搜索
          </el-button>
        </el-input>
      </div>
    </div>
    <div class="classBox">
      <!-- 层级选择 -->
      <div class="center_container classBox_container" v-show="!isSearchPanel">
        <div class="classBox_item classBox_list">
            <Exhibition
              :title="'行业'"
              :data="categoryList"
              @chooseItem="chooseItem"
            >
            </Exhibition>
        </div>
        <div class="classBox_item classBox_transition">
            <div class="classBox_transition_container">
              <i class="el-icon-d-arrow-right"></i>
            </div>
        </div>
        <div class="classBox_item classBox_list">
            <Exhibition
              :title="'子行业'"
              :data="subCategoryList"
              @chooseItem="chooseItem"
            >
            </Exhibition>
        </div>
        <div class="classBox_item classBox_transition">
            <div class="classBox_transition_container">
              <i class="el-icon-d-arrow-right"></i>
            </div>
        </div>
        <div class="classBox_item classBox_list">
            <Exhibition
              :title="'店铺'"
              :data="storeList"
              @chooseItem="chooseItem"
            >
            </Exhibition>
        </div>
      </div>
      <!-- 搜索结果 -->
      <div class="center_container classBox_container" v-if="isSearchPanel">
        <div class="searchResultBox">
          <div class="searchResultBox_title">
            <div class="searchResultBox_totalNumber">
              匹配 <span style="color:rgb(247, 152, 10);">{{searchResultLength}}</span> 个类目
            </div>
            <div class="searchResultBox_backChooseBox">
              <i class="iconfont icon-fanhui backChoose"
                @click="backChoose"
                title="返回重新选择"
              >
              </i>
            </div>
          </div>
          <div class="searchResultBox_content" v-loading="isSearching">
            <el-collapse v-model="activeNames">
              <el-collapse-item name="1">
                <template slot="title">
                  <span class="content_title">
                    <i class="iconfont icon-xingye"
                      style="font-size:19px;margin: auto 8px auto 20px;"
                    ></i>行业
                  </span>
                </template>
                <div
                  class="search_content_box"
                  v-for="(groupItem, keyGroup) in categoryList_search"
                  :key="'group_'+keyGroup">
                  <div class="left">
                    &bull;
                  </div>
                  <div class="right">
                    <div
                      v-for="(item, key) in groupItem"
                      :class="getSearchItemClass(item)"
                      @click="chooseSearchItem(item)"
                      :key="'group_'+keyGroup+'_'+key"
                    >\{\{item.pName?item.pName+'>'+item.name:item.name\}\}
                    </div>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item name="2" v-show="storeList_search.length">
                <template slot="title">
                  <span class="content_title">
                    <i class="iconfont icon-permissions"
                      style="font-size:17px;margin: auto 8px auto 20px;"
                    ></i>店铺
                  </span>
                </template>
                <div class="search_content_box">
                  <div class="right">
                    <div
                      v-for="(item, key) in storeList_search"
                      :class="getSearchItemClass(item)"
                      @click="chooseSearchItem(item)"
                      :key="'searchStore_'+key"
                    >\{\{item.name\}\}
                    </div>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <el-button
        type="primary"
        :disabled="!searchable"
        @click="analysisData"
      >查看数据
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placeholder_search: '请输入行业、店铺关键词',
      searchText: '',
      isSearchPanel: false,
      isSearching: false,
      activeNames: ['1', '2'],
      categoryList: [],
      subCategoryList: [],
      storeList: [],
      selectedEntity: {},
      categoryList_search: [],
      storeList_search: [],
      searchResultLength: 0,
      selectedEntity_search: {},
    };
  },
  computed: {
    searchable() {
      if (this.isSearchPanel) {
        return Object.prototype.hasOwnProperty.call(this.selectedEntity_search, 'name');
      }

      return Object.prototype.hasOwnProperty.call(this.selectedEntity, 'name');
    },
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      // ajax获取行业列表
      this.categoryList = Array.from({ length: 10 }).map((item, index) => {
        const newItem = {
          name: `行业${index + 1}`,
          type: 'category',
        };
        return newItem;
      });
    },
    getSubCategoryList(param) {
      // ajax获取子行业列表
      this.subCategoryList = Array.from({ length: 15 }).map((item, index) => {
        const newItem = {
          name: `${param.name}-子行业${index + 1}`,
          type: 'subCategory',
        };
        return newItem;
      });
    },
    getStoreList(param) {
      // ajax获取店铺列表
      this.storeList = Array.from({ length: 20 }).map((item, index) => {
        const newItem = {
          name: `${param.name}-店铺${index + 1}`,
          type: 'store',
        };
        return newItem;
      });
    },
    chooseItem(item) {
      this.selectedEntity = item;
      if (item.type === 'category') {
        this.subCategoryList = [];
        this.storeList = [];
        this.getSubCategoryList(item);
      } else if (item.type === 'subCategory') {
        this.storeList = [];
        this.getStoreList(item);
      }
    },
    fuzzyQuery() {
      if (this.searchText.replace(/(^\s*)|(\s*$)/g, '') === '') {
        return;
      }

      this.isSearching = true;
      // ajax查询搜索
      setTimeout(() => {
        this.isSearching = false;
        this.isSearchPanel = true;

        this.storeList_search = [
          {
            name: '店铺1',
            type: 'store',
          },
          {
            name: '店铺2',
            type: 'store',
          },
        ];

        this.categoryList_search = [
          [
            {
              name: '衣服',
              type: 'category',
            },
            {
              pName: '衣服',
              name: '短袖',
              type: 'subCategory',
            },
          ],
          [
            {
              name: '裤子',
              type: 'category',
            },
            {
              pName: '裤子',
              name: '短裤',
              type: 'subCategory',
            },
          ],
        ];
      }, 2000);
    },
    backChoose() {
      this.isSearchPanel = false;
    },
    getSearchItemClass(item) {
      const classArr = ['content_item'];
      if (item.name === this.selectedEntity_search.name) {
        classArr.push('content_item--selected');
      }
      return classArr;
    },
    chooseSearchItem(item) {
      this.selectedEntity_search = item;
    },
    analysisData() {
      if (this.isSearchPanel) { // 搜索筛选
        if (this.selectedEntity_search.name) {
          this.routeChange(this.selectedEntity_search);
        }
      } else if (this.selectedEntity.name) { // 层级筛选
        this.routeChange(this.selectedEntity);
      }
    },
    routeChange(selectEntity) {
      sessionStorage.setItem('selectedEntity_pinduoduo', JSON.stringify(selectEntity));
      this.$router.push({ path: '/{{ root_path }}/analysis' });
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  position: relative;
  height: 100%;

  .searchBox {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    height: 50px;
  }

  .center_container{
    position: relative;
    width: 50%;
    margin: 0 auto;
    height: 100%;
  }

  .classBox {
    position: absolute;
    top: 110px;
    left: 0;
    right: 0;
    bottom: 60px;

    .classBox_container{
      width: 85%;
      height: calc(100% - 10px);

      .classBox_item{
        float: left;
        height: 100%;
      }

      .classBox_list{
        width: calc((100% - 120px) / 3);
        position: relative;
      }

      .classBox_transition{
        width: 60px;

        .classBox_transition_container{
          position: relative;
          width: 25px;
          height: 25px;
          top: 50%;
          left: 50%;
          margin-top: -12.5px;
          margin-left: -12.5px;
          color: #409EFF;
          font-size: 25px;
        }
      }

      .searchResultBox{
        position: absolute;
        top: 10px;
        left: 5px;
        right: 5px;
        bottom: 10px;
        border: 1px solid #ebeef5;
        border-radius: 5px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

        .searchResultBox_title{
          position: relative;
          height: 45px;
          line-height: 45px;
          font-size: 15px;
          background: #409EFF;
          color: #ffffff;
          border-bottom: 1px solid #dfe1e7;
          border-radius: 5px 5px 0 0;

          .searchResultBox_totalNumber{
            position: absolute;
            top: 0;
            right: 60px;
            bottom: 0;
            left: 15px;
            text-align: left;
            font-size: 15px;
          }

          .searchResultBox_backChooseBox{
            position: absolute;
            top: 0;
            right: 0;
            width: 60px;
            bottom: 0;

            .backChoose{
              font-size: 22px;
              cursor: pointer;
            }
          }
        }

        .searchResultBox_content{
          position: absolute;
          top: 45px;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-y: auto;
          overflow-x: hidden;
          text-align: left;

          .content_title{
            font-size: 15px;
          }

          .search_content_box{
            position: relative;

            .left{
              position: absolute;
              top: 0;
              left: 20px;
              width: 25px;
              height: 35px;
              line-height: 35px;
              text-align: center;
              font-size: 28px;
            }

            .right{
              width: calc(100% - 70px);
              margin-left: 40px;

              .content_item{
                padding: 0 5px;
                height: 35px;
                line-height: 35px;
                cursor: pointer;
              }

              .content_item:hover{
                color: #ffffff;
                background-color: rgba(64, 158, 255, 0.6);
              }

              .content_item--selected{
                color: #409EFF;
              }
            }
          }
        }
      }
    }
  }

  .buttonBox {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;

    .el-button{
      padding: 10px 60px;
      font-size: 15px;
    }
  }
}
</style>
