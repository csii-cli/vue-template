<template>
  <div>
    <div>
      <el-form :rules="rules" class="rule-form" ref="form" :model="form" label-width="160px">
        <el-form-item inline class="reset-item title-form" prop="atitle" label="标题:">
          <el-input
            size="medium"
            class="title-input"
            v-model="form.aticleTitle"
            placeholder="请输入标题"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item inline class="reset-item title-form" prop="aticleType" label="选择分类:">
          <el-select v-model="form.aticleType" placeholder="请选择">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="reset-item title-form" prop="aticleDesp" label="概要描述:">
          <el-input
            type="textarea"
            :rows="4"
            size="medium"
            v-model="form.aticleDesp"
            placeholder="请输入概要描述"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="mark-mavon">
      <mavon-editor
        class="mark_editor"
        :ishljs="true"
        @imgAdd="handleEditorImgAdd"
        @imgDel="handleEditorImgDel"
        v-model="form.aticleContent"
      ></mavon-editor>
    </div>
    <div class="alin_center">
      <div class="m_btn_primary btn-left" @click="goBack()">返回</div>
      <div class="m_btn_primary" @click="submitText('form')">修改</div>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import { updateAticle, getToken, dleEditorImgDel } from '@api/api'
export default {
  name: 'modify-detail',
  data() {
    return {
      modifyData: '',
      options: [
        {
          label: 'JavaScript',
          value: 'JavaScript'
        },
        {
          label: 'NodeJs',
          value: 'NodeJs'
        },
        {
          label: 'Java',
          value: 'Java'
        }
      ],
      form: {
        aticleTitle: '',
        aticleContent: '',
        aticleDesp: '',
        aticleType: '',
        writeDate: this.$options.filters.timeFormat(new Date(), 'yyyy-mm-dd'),
        aticleAuthor: sessionStorage.getItem('SESSION_ID')
      },
      rules: {
        aticleTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        aticleDesp: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 6, max: 100, message: '长度在 6 到 100 个字符', trigger: 'blur' }
        ],
        aticleType: [{ required: true, message: '请选择文章类型', trigger: 'blur' }],
        aticleContent: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const uData = JSON.parse(sessionStorage.getItem('articleModifyItem'))
      this.form.aticleContent = uData.aticleContent
      this.form.aticleType = uData.aticleType
      this.form.aticleTitle = uData.aticleTitle
      this.form.aticleDesp = uData.aticleDesp
      this.form.id = uData.id
    },
    submitText(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await getToken()
          const res = await updateAticle(this.form)
          if (res.respCode === '00000000') {
            this.$message('修改成功!')
          } else {
          }
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    handleEditorImgAdd(pos, $file) {
      if ($file.size > 1024000) {
        this.$message('文件大小超过限制')
        return false
      }
      const formdata = new FormData()
      formdata.append('file', $file)

      this.$axios({
        method: 'post',
        url: '/api/file/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formdata
      })
        .then((res) => {
          this.$message.success('上传成功')
          console.log(res.data.data)
          console.log(config)
          let name = $file.name
          const url = config.baseUrl.imgUrl + res.data.data.imgUrl
          console.log('url', url)
          if (name.includes('-')) {
            name = name.replace(/-/g, '')
          }
          const content = this.form.aticleContent
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
          if (content.includes(name)) {
            const oStr = `(${pos})`
            const nStr = `(${url})`
            const index = content.indexOf(oStr)
            const str = content.replace(oStr, '')
            const insertStr = (soure, start, newStr) => {
              return soure.slice(0, start) + newStr + soure.slice(start)
            }
            this.form.aticleContent = insertStr(str, index, nStr)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleEditorImgDel(pos) {
      delete this.imgFile[pos]
      const param = {
        fileName: pos[1].name,
        aticleId: this.form.id,
        aticleContent: this.form.aticleContent
      }
      dleEditorImgDel(param).then((res) => {
        this.$message.success('删除成功！')
      })
    }
  }
}
</script>

<style scoped lang="less">
.rule-form {
  text-align: center;
  .title-form {
    width: 600px;
    .el-select {
      display: block;
    }
  }
}
.tiny-box {
  margin: 0 auto;
  min-width: 600px;
  width: 80%;
}
.titleContent {
  padding: 10px;
  .textTitle {
    font-size: 14px;
    padding-right: 10px;
  }
}
.reset-item {
  margin: 30px auto;
  width: 360px;
}
.btsubmit {
  margin-top: 30px;
}
</style>
