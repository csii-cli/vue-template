<template>
  <div class="content">
    <el-upload
      ref="upload"
      :file-list="fileList"
      :action="api"
      :data="uploadData"
      :on-error="handleError"
      :on-change="handleChangeUpload"
      :before-remove="handleUploadRemove"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :limit="1"
      accept="*"
      :http-request="submitUpload"
      class="files"
      size="small"
      :auto-upload="false"
      :name="'excelName'"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">支持上传.xls文件</div>
    </el-upload>
    <div>
      <m-btn @click="submit">下一步</m-btn>
      <m-btn @click="test">base64toFile</m-btn>
    </div>
    <div>
      <img :src="src" alt="" />
    </div>
  </div>
</template>

<script>
import { fileToBase64, base64toFile, imgToBase64 } from '@/libs/utils'
import { uploadStr } from '@/api/api'
export default {
  name: 'index_uniq',
  data() {
    return {
      api: `${process.env.VUE_APP_API}uploadStr`,
      uploadData: {
        title: 'john'
      },
      fileList: [],
      file: null,
      src: ''
    }
  },
  created() {},
  mounted() {
    this.kit()
  },
  methods: {
    kit() {
      // imgToBase64('https://img0.bdstatic.com/static/searchdetail/img/logo-2X_2dd9a28.png').then((res) => console.log(res))
      imgToBase64(require('../../../assets/img/logo.png')).then((res) => {
        this.src = res
        console.log(res)
      })
    },
    test() {
      // console.log(base64toFile(this.file, 'pngName'))
      const bsFile = this.fileList[0]
      fileToBase64(bsFile).then((ele) => {
        const res = base64toFile(ele)
        console.log(res)
        const audioData = new FormData()
        audioData.append('file', res)
        audioData.append('fileName', res.name)
        console.log('params', audioData)
        this.$axios.post('/api/file/upload', audioData).then((res) => {
          console.log(res)
        })
      })
    },
    submit() {
      this.submitUpload(this.fileList[0])
    },
    submitUpload(bsFile) {
      console.log('bsFile', bsFile)
      fileToBase64(bsFile).then((ele) => {
        this.file = ele
        const params = {
          file: ele + '|' + bsFile.name
        }
        console.log('params', params)
        // this.$axios.post('/api/file/uploadStr', params).then((res) => {
        //   console.log(res)
        // })
        uploadStr(params).then((res) => {
          console.log(res)
        })
      })
    },
    // 上传文件
    // eslint-disable-next-line handle-callback-err
    handleError(err, file, fileList) {
      this.$mConfirm('提示', '文件解析失败', {
        confirmButtonText: '确定'
      })
    },
    handleUploadRemove(file, fileList) {
      console.log('remove')
      // 清除文件名
      this.fileList = []
    },
    handleChangeUpload(file, fileList) {
      // 文件名
      this.fileList = fileList
    },
    // 上传文件之前
    beforeUpload(file) {},
    handleSuccess() {}
  }
}
</script>

<style lang="less" scoped></style>
