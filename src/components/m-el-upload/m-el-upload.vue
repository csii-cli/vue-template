<template>
  <div>
    <el-upload
      ref="innerUpload"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :multiple="multiple"
      :limit="limit"
      :name="name"
      :data="uploadParams"
      :auto-upload="autoUpload"
      :http-request="httpRequest"
      :with-credentials="withCredentials"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :show-file-list="showFileList"
      :on-success="handleSuccess"
      :on-error="handleError"
      :list-type="listType"
      :before-upload="handleBeforeUpload"
      :disabled="disabled"
      :accept="accept"
      :on-progress="handleProgress"
      :on-change="handleChange"
    >
      <slot>
        <el-button size="small" type="primary" style="width: 93px; font-size: 14px !important"
          >选择文件</el-button
        >
      </slot>
      <span v-if="maxLen" class="noneShow" style="margin-left: 10px">每次批量汇款最多支持20笔</span>
      <div slot="tip" class="upload__tips">
        <p>{{ tips }}</p>
        <p>
          <!-- <span v-if="accept">只支持上传{{accept}}格式的文件</span><br> -->
          <span v-if="maxSize" style="font-size: 14px !important"
            >增加附件（附件：JPG格式图片，最大不要超过{{ formattedSize }}）</span
          >
        </p>
      </div>
    </el-upload>

    <el-dialog :visible.sync="visiable" width="80%" top="8vh" append-to-body>
      <div class="img" v-if="['.jpg', '.png', '.jpeg', '.webp', '.gif'].indexOf(suffix) !== -1">
        <img :src="url" alt />
      </div>
      <iframe v-else-if="suffix === '.pdf'" :src="url" class="pdf"></iframe>
      <div v-else>该文件类型暂不支持预览</div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import ajax from './ajax'
export default {
  props: {
    maxLen: {
      type: Boolean,
      default: false
    },
    fileList: Array, // 初始文件列表
    action: {
      type: String,
      default: ''
    },
    onSuccess: Function,
    onError: Function,
    multiple: false, // 是否支持多选
    limit: {
      type: Number,
      default: 2
    }, // 最大上传个数
    tips: {
      type: String,
      default: ''
    }, // 上传提示
    accept: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'UploadFile'
    },
    withCredentials: true,
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // baseParams: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       // IFP_SID: sessionStorage.IFP_SESSION_ID
    //     }
    //   }
    // },
    customHttpRequest: Function,
    // 'default'： elementui默认, 'ebank'：'华兴特殊文件上传，文件名会', 'custom'：自定义
    httpRequestType: {
      type: String,
      default: 'default'
    },
    showFileList: true,
    listType: {
      type: String,
      default: 'text'
    },
    autoUpload: true,
    disabled: false,
    value: {},
    dealFileName: false, // 处理fileName，批量excel上传一般要这样处理，具体看情况
    onPreview: null,
    onExceed: null,
    maxSize: null,
    onRemove: null,
    onChange: null
  },
  data() {
    return {
      url: '',
      visiable: false,
      baseParams: {
        // IFP_SID: sessionStorage.IFP_SESSION_ID
      },
      suffix: '' // 当前预览的后缀
    }
  },
  watch: {
    fileList(n, o) {
      this.$emit('change', n)
    }
  },
  computed: {
    formattedSize() {
      let unit = 'KB'
      let size = this.maxSize
      if (this.maxSize > 1024) {
        unit = 'MB'
        size = this.maxSize / 1024
      }
      return size + unit
    },
    uploadParams() {
      // if (!JSON.stringify(this.baseParams) !== '{}') {
      //   return Object.assign(this.data)
      // } else {
      return Object.assign(this.baseParams, this.data)
      // }
    },
    httpRequest() {
      return this.httpRequestType === 'default'
        ? ajax
        : this.httpRequestType === 'ebank'
          ? this.handleRequest
          : this.customHttpRequest
    }
  },
  methods: {
    // 覆盖默认上传行为
    handleRequest(params) {
      // 上传前校验
      const check = this.handleBeforeUpload(params.file)
      if (!check) return
      const self = this
      const file = params.file
      const formData = new FormData()
      let uploadName = this.name
      if (this.dealFileName) {
        uploadName = JSON.stringify({
          ...this.uploadParams,
          uploadName: file.name,
          filename: file.name
        })
      }
      formData.append(this.name, file)
      if (this.uploadParams) {
        for (var key in this.uploadParams) {
          formData.append(key, this.uploadParams[key])
        }
      }
      axios
        .post(
          self.action,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              loginType: 'C',
              mchannelId: 'EIBS'
            }
          },
          {
            onUploadProgress: (event) => {
              // 监听上传进度
              event.percent = (event.loaded / event.total) * 100
              params.onProgress(event)
            }
          }
        )
        .then((res) => {
          this.handleSuccess(res.data, params.file, self.$refs.innerUpload)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleSuccess(response, file, fileList) {
      console.log(response, 'response')
      if (!response) return
      if (typeof response === String) {
        const reg = /result\.\w+\s=\s[\'\"].+[\'\"];/g // 处理后台返回结果
        const matches = response.match(reg)
        const result = {}
        const str = matches.join('')
        eval(str)
        const { flowBankFileName, errorCode, errorMsg } = result
        if (errorCode == '0') {
          if (flowBankFileName != '暂时没有值') {
            file.dir = flowBankFileName.substring(0, flowBankFileName.lastIndexOf('/')) // 文件名
            file.fullPath = flowBankFileName // 后台返回的文件全名

            const index1 = flowBankFileName.lastIndexOf('/')
            const index2 = flowBankFileName.lastIndexOf('\\')
            const index = Math.max(index1, index2)
            let fileNameValue = ''
            if (index == -1) {
              fileNameValue = flowBankFileName
            } else {
              fileNameValue = flowBankFileName.substring(index + 1)
            }
            file.fileNameValue = fileNameValue
            file.fileName = flowBankFileName.substring(flowBankFileName.indexOf('||') + 2) // 服务器保存的文件名
          } else {
          }
          this.$emit('input', fileList)
        } else {
          fileList = fileList.splice(fileList.indexOf(file), 1)
          // this.showAlert(errorMsg)
        }
        this.onSuccess && this.onSuccess(result, response, file, fileList)
      } else {
        this.onSuccess && this.onSuccess(response, file, fileList)
      }
    },
    handleError(err, file, fileList) {},
    handleBeforeUpload(file) {
      // 限制上传大小
      if (this.maxSize) {
        const isExceedSize = file.size / 1024 > this.maxSize
        if (isExceedSize) {
          this.showAlert(`上传文件大小不能超过${this.formattedSize}`)
          return false
        }
      }
      return true
    },
    handleRemove(file, fileList) {
      file.status === 'success' && this.onRemove && this.onRemove(file, fileList)
    },
    handlePreview(file, fileList) {
      if (this.onPreview) {
        // 覆盖默认预览
        this.onPreview(file)
      } else {
        // 默认预览
        const fullPath = file.fullPath
        this.url = ''
        if (fullPath) {
          const path = fullPath.substring(0, fullPath.lastIndexOf('/')) // 文件路径
          this.suffix = file.fileName.substring(file.fileName.lastIndexOf('.'))
          console.log(this.suffix)
          this.url = `/eweb/showISBMessage.do?FileName=${file.fileName}&downLoadPath=${path}&IFP_SID=${sessionStorage.IFP_SESSION_ID}`
          this.visiable = true
        }
      }
    },
    handleExceed(files, fileList) {
      this.showAlert(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    handleProgress(event, file, fileList) {
      console.log('进度', event)
      this.$emit('handleProgress', event, file, fileList)
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    showAlert(msg) {
      this.$mConfirm('提示', msg, {
        confirmButtonText: '确定'
      })
    },
    clearFiles() {
      this.$refs.innerUpload.clearFiles()
    },
    submit() {
      this.$refs.innerUpload.submit()
    },
    handleChange(file, fileList) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      if (this.maxLen) {
        if (testmsg != 'xls' && testmsg != 'xlsx' && testmsg != 'txt') {
          this.$mConfirm('提示', '您提交的文件格式有误，请选择xls/xlsx/txt格式文件进行提交', {
            confirmButtonText: '确定'
          })
          this.$refs.innerUpload.clearFiles()
          return false
        }
      } else if (this.maxSize) {
        if (testmsg.toLocaleLowerCase() != 'jpg') {
          this.$mConfirm('提示', '请选择jpg格式文件上传！', {
            confirmButtonText: '确定'
          })
          this.$refs.innerUpload.clearFiles()
          return false
        }
      }
      if (this.limit == 2 && fileList.length > 1) {
        fileList.splice(0, 1)
      }
      console.log(fileList, 'fileList')
      this.onChange && this.onChange(file, fileList)
    }
  },
  mounted() {}
}
</script>

<style scoped lang="scss">
.upload__tips {
  font-size: 12px;
  color: #606266;
  margin-top: 7px;
}
.img {
  padding: 5px;
  text-align: center;
  img {
    box-shadow: 1px 3px 18px #999;
    width: 100%;
  }
}
.pdf {
  width: 100%;
  height: 700px;
}
</style>
