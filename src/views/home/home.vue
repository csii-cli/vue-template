<template>
  <div class="app-home">
    <div class="app-conent">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="aticleBlock">
            <div class="check-container" v-show="routeName === 'imjohn'">
              <li
                @click="handleClick(item)"
                :class="item.active ? 'isActive' : ''"
                v-for="(item, index) in checkItem"
                :key="index"
                :label="item.label"
                name="first"
              >
                {{ item.name }}
              </li>
            </div>
            <ul class="list-ul" v-if="article.length">
              <li class="list-li" @click.stop="GoArticleDetail(item, false)" v-for="(item, index) in article" :key="index">
                <div class="meta-container">
                  <div class="user-message">
                    {{ item.aticleAuthor }}
                  </div>
                  <div data-v-02f416ca="" class="dividing"></div>
                  <div class="write-date">{{ item.writeDate }}</div>
                  <div data-v-02f416ca="" class="dividing"></div>
                  <div class="write-date">{{ item.aticleType }}</div>
                </div>
                <div class="aticle-content">
                  <div class="aticle-title">
                    {{ item.aticleTitle }}
                  </div>
                  <div class="aticle-desp">
                    {{ item.aticleDesp }}
                  </div>
                </div>
                <div class="aticle-tool">
                  <li>
                    <i class="el-icon-view"></i>
                    <span class="icon-span">{{ item.viewNum }}</span>
                  </li>
                  <li @click.stop.prevent="addGood(item)">
                    <i class="el-icon-thumb" :class="item.isGood ? 'active' : ''"></i>
                    <span class="icon-span" :class="item.isGood ? 'active' : ''">{{ item.goodNum }}</span>
                  </li>
                  <li @click.stop.prevent="GoArticleDetail(item, true)">
                    <i class="el-icon-chat-round"></i>
                    <span class="icon-span">{{ item.commentNum }}</span>
                  </li>
                </div>
              </li>
            </ul>
            <ul class="no-list" v-else>
              <li>这里啥都没有</li>
            </ul>
          </div>
        </el-col>
        <el-col class="right-block" :span="8">
          <img src="@/assets/img/t1.png" alt="" />
          <img src="@/assets/img/t2.png" alt="" />
          <img id="imgToGray" src="@/assets/img/t2.png" alt="" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { addReadNum, addGoodNum, getAllArticle, getArticle, getTypeArticle } from '@api/api'
export default {
  inject: ['reload'],
  name: 'Home',
  data() {
    return {
      routeName: '',
      user_id: null,
      article: [],
      checkItem: [
        { label: '全部文章', name: '全部文章', active: true },
        { label: '我的文章', name: '我的文章', active: false },
        { label: '最近文章', name: '最近文章', active: false }
      ]
    }
  },
  mounted() {
    this.routeName = this.$route.params.id
    this.user_id = Number(sessionStorage.getItem('USER_ID'))
    if (this.$route.params.id === 'imjohn') {
      this.getArt()
    } else {
      this.getTypeArt(this.$route.params.id)
    }
    // this.init()
  },
  methods: {
    goTo(val) {
      this.$router.push(val)
    },
    // 是否点赞判断
    hasGood(val) {
      if (!val) return false
      for (let i = 0; i < val.length; i++) {
        val[i].top_mids &&
          val[i].top_mids.forEach((ele) => {
            if (Number(sessionStorage.getItem('USER_ID')) === Number(ele.userId) && ele.goodFlag === '1') {
              val[i].isGood = true
            }
          })
      }
    },
    async getTypeArt(val) {
      const res = await getTypeArticle({
        aticleType: val
      })
      if (res.data) {
        this.hasGood(res.data)
        this.article = res.data
      }
    },
    async getArt() {
      const res = await getAllArticle()
      if (res.data) {
        this.hasGood(res.data)
      }
      this.article = res.data
    },
    async getMineArt() {
      const userName = window.sessionStorage.getItem('SESSION_ID')
      if (!userName) {
        this.$mConfirm('提示', '请先登录!', {
          confirmButtonText: '确认'
        }).then(() => {
          this.$router.push({
            path: '/login'
          })
        })
        return
      }
      const res = await getArticle({
        name: window.sessionStorage.getItem('SESSION_ID')
      })
      if (res.data) {
        this.hasGood(res.data)
        this.article = res.data
      }
    },
    async GoArticleDetail(val, flag) {
      const res = await addReadNum({
        id: val.id
      })
      if (res.respCode === '00000000') {
        sessionStorage.setItem('articleTitle', JSON.stringify(val))
        this.$router.push({
          path: '/m-article',
          query: {
            id: val.id
          }
        })
      }
    },
    showErr() {
      this.$message('暂未开放！')
    },
    /* 点赞 */
    addGood(val) {
      addGoodNum({
        aticleId: val.id
      }).then((res) => {
        console.log('addGoodRes', res)
        if (this.$route.params.id === 'imjohn') {
          this.getArt()
        } else {
          this.getTypeArt(this.$route.params.id)
        }
      })
    },
    async handleClick(val) {
      console.log(val)
      let oldVal = null
      if (val.active) return
      this.checkItem.forEach((ele, index) => {
        if (ele.active) {
          oldVal = index
        }
        ele.active = false
      })
      switch (val.name) {
        case '全部文章':
          try {
            await this.getArt()
            val.active = true
          } catch (error) {
            this.checkItem[oldVal].active = true
          }

          break
        case '我的文章':
          try {
            await this.getMineArt()
            val.active = true
          } catch (error) {
            this.checkItem[oldVal].active = true
          }

          break
        case '最近文章':
          this.article = this.article && this.article.length > 5 ? this.article.slice(0, 5) : this.article
          val.active = true
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.active {
  color: #1d7dfa;
}
.app-home {
  width: 100%;
  .app-conent {
    width: 100%;
    max-width: 960px;
    position: relative;
    margin: 0 auto;
    .right-block {
      overflow: hidden;
      img {
        cursor: pointer;
        width: 100%;
        border-radius: 4px;
      }
    }
  }
  // .app-conent::after {
  //   background: url('../../assets/img/bz.jpg');
  //   content: '';
  //   opacity: 0.5;
  //   top: 0;
  //   left: 0;
  //   bottom: 0;
  //   right: 0;
  //   position: absolute;
  // }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__item.is-animating {
  // eslint-disable-next-line no-irregular-whitespace
  transition: opacity 0.2s ease-in-out !important;
}
.aticleBlock {
  background: #fff;
  .check-container {
    display: flex;
    align-items: center;
    padding: 10px;
    padding-left: 15px;
    border-bottom: 1px solid #e5e6eb;
    li:first-of-type {
      margin-left: 0;
      padding-left: 0;
      border-left: none;
    }
    li {
      padding-left: 10px;
      margin-left: 10px;
      font-size: 14px;
      font-weight: 500;
      border-left: 1px solid #e5e6eb;
      cursor: pointer;
    }
    li.isActive {
      color: #1d7dfa;
    }
  }
  .no-list {
    height: 600px;
    li {
      font-size: 14px;
      color: #333;
      margin: 0 auto;
      height: 600px;
      line-height: 600px;
      text-align: center;
    }
  }
  .list-ul {
    margin: 0 auto;
    padding: 0 15px;
    .list-li {
      font-size: 16px;
      text-align: left;
      line-height: 32px;
      cursor: pointer;
      padding-left: 5px;
      border-bottom: 1px solid #e5e6eb;
      margin-top: 6px;
      padding-bottom: 6px;
      .meta-container {
        display: flex;
        align-items: center;
        .user-message {
          color: #86909c;
        }
        .dividing {
          width: 1px;
          height: 14px;
          background: #e5e6eb;
          margin: 0 8px;
        }
        .write-date {
          color: #86909c;
        }
      }
      .aticle-content {
        .aticle-title {
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #1d2129;
          margin-bottom: 8px;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .aticle-desp {
          font-weight: 400;
          font-size: 13px;
          line-height: 22px;
          color: #86909c;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      .aticle-tool {
        display: flex;
        li:hover {
          color: #1d7dfa;
        }
        .icon-span {
          padding: 0 5px;
        }
        .el-icon-thumb,
        .el-icon-chat-round {
          margin-left: 15px;
        }
      }
    }
    .list-li:last-of-type {
      border-bottom: none;
    }
  }
}
html {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  filter: gray;
}
</style>
