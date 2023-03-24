<template>
  <div class="content">
    <div class="title">
      {{ articleData.aticleTitle }}
    </div>
    <div class="aticleDesp">
      {{ articleData.aticleDesp }}
    </div>
    <div class="articleContent markdown-body" v-html="articleData.aticleContent"></div>
    <div class="aticleDate">
      {{ articleData.writeDate }}
    </div>
    <div class="author">
      {{ articleData.aticleAuthor }}
    </div>
    <div>
      <el-form :rules="rules" class="rule-form" ref="form" :model="form" label-width="60px"
        ><el-form-item class="reset-item title-form" prop="content" label="评论:">
          <el-input
            type="textarea"
            :rows="2"
            size="medium"
            v-model="form.content"
            placeholder="请输入1-20评论"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="alin_right">
        <div class="m_btn_primary" @click="submitText('form')">发表评论</div>
      </div>
    </div>
    <div v-if="commentList.length" ref="comment" class="comment">
      <h1>全部评论</h1>
      <div class="comment_list" v-for="(item, index) in commentList" :key="index">
        <div class="comment-header">
          <p>{{ item.answerName }}</p>
          <p>{{ item.create_time | timeAgo }}</p>
        </div>
        <div class="comment-content">
          <p>{{ item.content }}</p>
        </div>
        <div class="comment-footer">
          <ul>
            <li @click.stop.prevent="addGood(item)">
              <i
                class="el-icon-thumb"
                :class="item.commentGoodFlag === '1' && item.answerId === user_id ? 'active' : ''"
              ></i>
              <span
                class="icon-span"
                :class="item.commentGoodFlag === '1' && item.answerId === user_id ? 'active' : ''"
                >{{ item.parseNum }}</span
              >
            </li>
            <li @click.stop.prevent="addReComment(item)">
              <div class="charRound">
                <i class="el-icon-chat-round"></i>
                <span class="icon-span" :ref="`c${item.id}`">回复</span>
                <span>{{ item.recommentNum }}</span>
              </div>
            </li>
          </ul>
          <div class="showReply" :ref="`${item.id}`">
            <div class="isShowReply">
              <div class="replyLeft">
                <el-form
                  class="rule-form"
                  :ref="`s${item.id}`"
                  :model="mform"
                  :rules="rules2"
                  label-width="60px"
                  ><el-form-item class="reset-item title-form" prop="content" label="回复:">
                    <el-input
                      type="textarea"
                      :rows="2"
                      size="medium"
                      v-model="mform.content"
                      placeholder="请输入1-20回复"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class="alin_right alin_right2">
                <div class="m_btn_primary" @click="submitTextReply(`s${item.id}`, item)">回复</div>
              </div>
            </div>
          </div>
          <div class="childReply">
            <div class="childReplyBox" v-for="(iten, index) in item.commentReplies" :key="index">
              <div class="childReply-header">
                <p>{{ iten.answerName }}</p>
                <p>{{ iten.create_time | timeAgo }}</p>
              </div>
              <div class="childReply-content">
                <p>{{ iten.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  addComment,
  getArticleById,
  getArticleById2,
  AddCommentReply,
  addGoodNum,
  addCommentGoodNum,
  queryCommentReply
} from '@/api/api'
import { marked } from 'marked'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'
export default {
  data() {
    return {
      user_id: null,
      chatText: '回复',
      isShowReply: false,
      articleData: {},
      commentList: [], // 评论
      form: {
        content: ''
      },
      mform: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入评论', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      },
      rules2: {
        content: [
          { required: true, message: '请输入评论', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.user_id = Number(sessionStorage.getItem('USER_ID'))
    this.init()
  },
  methods: {
    async init() {
      const res = await getArticleById2({
        id: this.$route.query.id
      })
      this.articleData = res.data
      this.commentList = res.data.comments // 评论
      console.log(this.commentList)
      // 处理markdown数据，data为markdown文件读出的字符串
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: (code) => {
          return hljs.highlightAuto(code).value
        },
        pedanic: false,
        gfm: true,
        tables: true,
        breaks: false,
        saniize: false,
        smartLists: true,
        smartynts: false,
        xhtml: false
      })
      this.articleData.aticleContent = marked(this.articleData.aticleContent)
    },
    submitText(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const form = {
            create_time: new Date().getTime(),
            content: this.form.content,
            aticleId: this.articleData.id
          }
          const res = await addComment(form)
          if (res.respCode === '00000000') {
            this.$message('发布成功!')
            this.form.content = ''
            this.init()
            this.$forceUpdate()
          }
        }
      })
    },
    showErr() {
      this.$message('暂未开放！')
    },
    async addReComment(item) {
      if (item.id && this.$refs[`c${item.id}`][0].innerText === '回复') {
        const res = await queryCommentReply({
          id: item.id
        })
        this.commentList.forEach((ele, index) => {
          if (ele.id === item.id) {
            this.commentList[index].commentReplies = res.data
            this.$forceUpdate()
          }
        })

        this.$refs[item.id][0].style.display = 'block'
        this.$refs[`c${item.id}`][0].innerText = '取消回复'
        // this.chatText = '取消回复'
      } else if (item.id && this.$refs[`c${item.id}`][0].innerText === '取消回复') {
        this.commentList.forEach((ele, index) => {
          if (ele.id === item.id) {
            this.commentList[index].commentReplies = []
            this.$forceUpdate()
          }
        })
        this.$refs[item.id][0].style.display = 'none'
        this.$refs[`c${item.id}`][0].innerText = '回复'
        // this.chatText = '回复'
      }
    },
    submitTextReply(formName, item) {
      this.$refs[formName][0].validate(async (valid) => {
        if (valid) {
          const params = {
            content: this.mform.content,
            userId: this.articleData.id,
            commentId: item.id,
            create_time: new Date().getTime()
          }
          console.log('params', params)
          const res = await AddCommentReply(params)
          if (res.respCode === '00000000') {
            const res = await queryCommentReply({
              id: item.id
            })
            this.commentList.forEach((ele, index) => {
              if (ele.id === item.id) {
                this.commentList[index].commentReplies = res.data
                this.$forceUpdate()
              }
            })
            this.$message('发布成功!')
            this.mform.content = ''
          }
        }
      })
    },
    /* 点赞 */
    async addGood(val) {
      const res = await addCommentGoodNum({
        commentId: val.id
      })
      console.log('addCommentGoodNum', res)
      if (res.data.msg === '点赞成功') {
        await this.init()
      } else if (res.data.msg === '取消点赞') {
        await this.init()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.active {
  color: #1d7dfa;
}
.childReply {
  margin-top: 15px;
  padding: 10px 20px;
  background: rgba(247, 248, 250, 0.7);
  border-radius: 4px;
  .childReplyBox {
    .childReply-header {
      display: flex;
      width: 100%;
      padding: 10px;
      p:first-of-type {
        flex: 1;
      }
    }
    .childReply-content {
      padding: 10px;
    }
  }
}
.showReply {
  display: none;
}
.isShowReply {
  display: flex;
  margin-top: 20px;
  .replyLeft {
    flex: 1;
  }
}
.alin_right2 {
  width: 140px;
  margin-left: 20px;
}
.comment {
  h1 {
    padding: 10px 5px;
    font-size: 18px;
  }
  margin-top: 50px;
  .comment_list {
    .comment-header {
      display: flex;
      padding: 10px;
      p:first-of-type {
        flex: 1;
      }
    }
    .comment-content {
      padding: 10px;
    }
    .comment-footer {
      ul {
        display: flex;
        li {
          cursor: pointer;
          display: inline-block;
        }
        li:last-of-type {
          margin-left: 10px;
        }
      }
      padding: 10px;
      span {
        margin-left: 5px;
      }
    }
  }
}
.title {
  text-align: center;
  margin: 10px 0 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  color: #252933;
}
.aticleDesp {
  text-align: left;
  margin: 20px 0 10px;
  color: #666;
  padding: 10px 23px;
  border-left: 4px solid #cbcbcb;
  background-color: #f8f8f8;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.articleContent {
  width: 100%;
}
.aticleDate {
  width: 100%;
  text-align: right;
  margin: 30px 30px 15px auto;
}
.author {
  margin: 15px 30px 30px auto;
  text-align: right;
  width: 100%;
}
</style>
