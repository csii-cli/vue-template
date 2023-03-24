<template>
  <div class="content">
    <div>
      <el-form :rules="rules" class="rule-form" ref="form" :model="form" label-width="160px">
        <el-form-item inline class="reset-item title-form" prop="atitle" label="标题:">
          <el-input
            size="medium"
            class="title-input"
            v-model="form.atitle"
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
            :rows="2"
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
        ref="md"
        @imgAdd="handleEditorImgAdd"
        @imgDel="handleEditorImgDel"
        class="mark_editor"
        :ishljs="true"
        v-model="form.content"
      ></mavon-editor>
    </div>
    <div class="alin_center">
      <div class="m_btn_primary" @click="submitText('form')">提交</div>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import { writeAticle, getToken, addMarkImage, dleEditorImgDel } from '@api/api'
export default {
  inject: ['reload'],
  name: 'm-editor',
  data() {
    return {
      imgFile: null,
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
        atitle: '',
        content: '',
        aticleDesp: '',
        aticleType: ''
      },
      rules: {
        atitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        aticleDesp: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 6, max: 100, message: '长度在 6 到 100 个字符', trigger: 'blur' }
        ],
        aticleType: [{ required: true, message: '请选择文章类型', trigger: 'blur' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      }
    }
  },
  mounted() {},
  methods: {
    submitText(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await getToken()
          const form = {
            writeDate: this.$options.filters.timeFormat(new Date(), 'yyyy-mm-dd'),
            aticleTitle: this.form.atitle,
            aticleAuthor: sessionStorage.getItem('SESSION_ID'),
            aticleContent: this.form.content,
            aticleDesp: this.form.aticleDesp,
            aticleType: this.form.aticleType
          }
          const res = await writeAticle(form)
          if (res.respCode === '00000000') {
            this.$message('提交成功!')
            this.reload()
          } else {
            this.reload()
          }
        }
      })
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
          const content = this.form.content
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
          if (content.includes(name)) {
            const oStr = `(${pos})`
            const nStr = `(${url})`
            const index = content.indexOf(oStr)
            const str = content.replace(oStr, '')
            const insertStr = (soure, start, newStr) => {
              return soure.slice(0, start) + newStr + soure.slice(start)
            }
            this.form.content = insertStr(str, index, nStr)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      // addMarkImage(formdata).then((res) => {
      //   this.$Message.success('上传成功')
      //   const url = res.data.data
      //   let name = $file.name
      //   if (name.includes('-')) {
      //     name = name.replace(/-/g, '')
      //   }
      //   const content = this.form.content
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
      //   if (content.includes(name)) {
      //     const oStr = `(${pos})`
      //     const nStr = `(${url})`
      //     const index = content.indexOf(oStr)
      //     const str = content.replace(oStr, '')
      //     const insertStr = (soure, start, newStr) => {
      //       return soure.slice(0, start) + newStr + soure.slice(start)
      //     }
      //     this.form.content = insertStr(str, index, nStr)
      //   }
      // })
    },
    handleEditorImgDel(pos) {
      delete this.imgFile[pos]
      const param = {
        fileName: pos[1].name
      }
      dleEditorImgDel(param).then((res) => {
        this.$message.success('删除成功！')
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
.mark_editor {
  min-height: 500px;
}
</style>
