<template>
  <div class="content">
    <h1>文章修改</h1>
    <ul class="list-ul" v-if="article.length">
      <li
        class="list-li"
        @click.stop.prevent="goModify(item)"
        v-for="(item, index) in article"
        :key="index"
      >
        {{ item.aticleTitle
        }}<i @click.stop.prevent="goDel(item)" class="el-icon-delete icon-ml"></i
        ><i @click.stop.prevent="goModify(item)" class="el-icon-edit icon-ml"></i>
      </li>
    </ul>
    <ul class="no-list" v-else>
      <li>这里啥都没有</li>
    </ul>
    <div v-if="total > 10" class="pagination-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getArticle, delAticle } from '@api/api'
export default {
  name: 'm-modify',
  data() {
    return {
      article: [],
      currentPage: 1,
      total: null,
      pageNum: 1,
      pageSize: 10,
      pageSizes: [10, 50, 100, 400]
    }
  },
  mounted() {
    this.getMineArt({
      pageSize: this.pageSize,
      pageNum: this.pageNum
    })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.getMineArt({
        pageSize: val,
        pageNum: this.pageNum
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.getMineArt({
        pageSize: this.pageSize,
        pageNum: val
      })
    },
    async getMineArt(params) {
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
      const res = await getArticle(params)
      if (res.data.list.length) {
        this.article = res.data.list.reverse()
        console.log(this.article.length)
        this.total = Number(res.data.total)
      }
    },
    goModify(val) {
      sessionStorage.setItem('articleModifyItem', JSON.stringify(val))
      this.$router.push({
        path: 'modify-detail'
      })
    },
    async goDel(val) {
      const res = await delAticle({
        id: val.id
      })
      if (res.respCode === '00000000') {
        this.$message(res.data.msg)
        this.getMineArt({
          pageSize: this.pageSize,
          pageNum: this.pageNum
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
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
h1 {
  text-align: center;
  font-size: 24px;
  margin: 10px;
}
.icon-ml {
  margin-left: 20px;
  float: right;
  cursor: pointer;
  line-height: 2;
}
.pagination-block {
  padding-left: 15px;
  margin-top: 20px;
}
.list-ul {
  margin: 0 auto;
  padding: 0 15px;
  min-height: 443px;
  .list-li {
    cursor: pointer;
    font-size: 16px;
    text-align: left;
    line-height: 32px;
    padding-left: 5px;
    border-bottom: 1px solid #e5e6eb;
    margin-top: 6px;
    padding-bottom: 6px;
  }
  .list-li:last-of-type {
    border-bottom: none;
  }
}
</style>
