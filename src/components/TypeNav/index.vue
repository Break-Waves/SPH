<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="changeShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2">
              <!-- 利用事件委派+编程式导航实现路由跳转并携带参数 -->
              <div
                class="item bo"
                v-for="(s, index) in categoryList"
                :key="s.categoryId"
                @click="goSearch($event)"
              >
                <h3
                  :class="{ cur: currentIndex == index }"
                  @mouseenter="changeIndex(index)"
                >
                  <a
                    :data-categoryname="s.categoryName"
                    :data-category1Id="s.categoryId"
                    >{{ s.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="ss in s.categoryChild"
                    :key="ss.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <!-- 给每个a标签绑定自定义属性 data-categoryName 可以找出绑定事件的子元素中谁是a标签 -->
                        <!-- 给每个a标签绑定自定义属性  data-categor 'x' Id 可以找出被点击的a标签是一级二级还是三级路由 -->
                        <a
                          :data-categoryname="ss.categoryName"
                          :data-category2Id="ss.categoryId"
                          >{{ ss.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="sss in ss.categoryChild"
                          :key="sss.categoryId"
                        >
                          <a
                            :data-categoryname="sss.categoryName"
                            :data-category3Id="sss.categoryId"
                            >{{ sss.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
//引入节流函数
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  methods: {
    //函数节流解决卡顿，就是由于用户行为过快,导致浏览器反应不过来,如果当前回调函数中有一些大量业务,有可能出现卡顿现象
    changeIndex: throttle(function (i) {
      this.currentIndex = i;
      // console.log("鼠标移动到了" + i);
    }),
    changeShow() {
      this.isShow = true;
    },
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
    goSearch(e) {
      //e.target.dataset可以得到该dom身上的所有属性
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      // console.log(e.target.dataset);
      //如果点击的dom元素有自定义属性categoryName，则一定是a标签，允许进行后续的逻辑
      if (categoryname) {
        //跳转的路由名称
        let location = { name: "search" };
        //这里设置query传参体，先设置的标签名参数
        let query = { categoryName: categoryname };
        //分类讨论，看点击的是一级二级还是三级路由，设置query的categoryId参数
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
};
</script>

<style lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27.5px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                    a:hover {
                      background-color: orange;
                      cursor: pointer;
                      color: black;
                    }
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: orange;
        }
      }
    }
  }
}
</style>
