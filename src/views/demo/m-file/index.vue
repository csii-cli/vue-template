<template>
  <div class="content">
    <h1>单文件上传</h1>
    <el-upload
      :limit="1"
      :multiple="false"
      class="upload-demo"
      action="/api/file/upload"
      :on-preview="single_handlePreview"
      :on-remove="single_handleRemove"
      :before-remove="single_beforeRemove"
      :before-upload="single_beforeUpload"
      accept=".xlsx, .xls, .txt"
      :on-exceed="single_handleExceed"
      :on-success="single_success"
      :list-type="'picture'"
      :submit="a_submit"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">不超过1M</div>
    </el-upload>

    <div class="under_line"></div>
    <h1>多文件上传</h1>
    <el-upload
      :limit="3"
      :multiple="true"
      class="upload-demo"
      action="/api/file/upload"
      :before-upload="multi_beforeUpload"
      :on-change="multi_change"
      :on-preview="multi_handlePreview"
      :on-remove="multi_handleRemove"
      :before-remove="multi_beforeRemove"
      :on-success="multi_success"
      accept="image/png, image/jpeg"
      :on-exceed="multi_handleExceed"
      :file-list="fileList"
      :list-type="'picture'"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，最多三个文件，单个文件不超过500kb
      </div>
    </el-upload>
    <div class="previewImg" v-if="itemList.length">
      <h1>预览服务端资源</h1>
      <ul v-for="(item, index) in itemList" :key="index">
        <li>
          <div class="prew-desp">
            文件名：{{ item.name }}-文件大小：{{ item.size | sizeTostr }}
            <a alt="下载" href="`http://www.imjohn.cn:9080/upload/${item.name}`">下载</a>
          </div>
          <div>
            <img class="prew-img" :src="`http://www.imjohn.cn:9080/upload/${item.name}`" alt="" />
          </div>
        </li>
      </ul>
      <img :src="imgSrc" alt="" />
    </div>
    <div class="under_line"></div>
    <h1>原生多文件上传(文件流转base64字符串提交)</h1>
    <!-- <el-upload
      class="upload-demo"
      action="/api/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      accept="image/png, image/jpeg"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">视频上传</div>
    </el-upload> -->
    <!-- <div class="under_line"></div> -->
    <!-- <div>
      <div class="fileBox">
        <el-button size="small" type="primary">点击上传</el-button>
        <input ref="test" type="file" @change="test()" class="fileTest" name="test" id="test" accept="image/png, image/jpeg" multiple="multiple" />
      </div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      <div class="img-list"></div>
    </div> -->
    <!-- <div class="under_line"></div> -->
    <div>
      <div class="fileBox">
        <el-button size="small" type="primary">点击上传</el-button>
        <input
          ref="test2"
          type="file"
          @change="blobStream()"
          class="fileTest"
          name="test2"
          id="test2"
          accept="*"
          multiple="multiple"
        />
      </div>
      <!-- <div slot="tip" class="el-upload__tip">只能上传pm4</div> -->
    </div>
    <div class="under_line"></div>
    <el-upload
      class="upload-demo"
      drag
      action="/api/file/upload"
      :limit="1"
      :multiple="false"
      :on-preview="single_handlePreview"
      :on-remove="single_handleRemove"
      :before-remove="single_beforeRemove"
      :before-upload="single_beforeUpload"
      accept="image/png, image/jpeg"
      :on-exceed="single_handleExceed"
      :on-success="single_success"
      :list-type="'picture'"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <div class="under_line"></div>
    <h1>fileToBase64</h1>
    <div>
      <div class="fileBox">
        <el-button size="small" type="primary">点击上传</el-button>
        <input
          ref="transFile"
          type="file"
          @change="transPic()"
          class="fileTest"
          name="transFile"
          id="transFile"
          accept="image/png, image/jpeg"
        />
      </div>
      <div>
        <el-input
          class="mt20"
          type="textarea"
          :rows="2"
          placeholder="转换后的base64"
          v-model="transBaseString"
        >
        </el-input>
        <m-btn class="mt20" v-copy="transBaseString" @click="copyString">复制base64</m-btn>
      </div>
    </div>
    <div class="under_line"></div>
    <h1>base64toFile</h1>
    <div>
      <div>
        <el-input
          class="mt20"
          type="textarea"
          :rows="2"
          placeholder="需要转换的base64"
          v-model="needBaseString"
        >
        </el-input>
        <m-btn class="mt20" @click="transBaseToFile">base64toFile</m-btn>
        <div class="mt20">
          <img class="tranImgPreview" v-if="imageUrl" :src="imageUrl" alt="" />
        </div>
      </div>
    </div>
    <div class="under_line"></div>
    <div class="m-link-left">
      <el-link type="primary" @click="downLoad">返回流pdf下载</el-link>
    </div>
    <div class="m-link-left">
      <el-link type="primary" @click="preView">返回流pdf预览</el-link>
    </div>
    <div class="m-link-left">
      <el-link type="primary" @click="preViewBase64">返回流图片预览</el-link>
    </div>
    <embed :src="this.pdfSrc" v-if="pdfSrc" width="100%" height="100%" type="application/pdf" />
    <div>
      <img style="width: 300px" :src="this.imgBase64Src" alt="" />
    </div>
  </div>
</template>
<script>
import { fileToBase64, base64toFile } from '@/libs/utils'
export default {
  data() {
    return {
      fileList: [],
      pdfSrc: '',
      imgSrc: '',
      imageUrl: '',
      imgBase64Src: '',
      itemList: [],
      maxSize: 1024,
      fileStr: null,
      transBaseString: '',
      needBaseString: ''
    }
  },
  mounted() {},
  methods: {
    a_submit(val) {
      debugger
    },
    /* 上传之前 */
    single_beforeUpload(file) {
      if (file.size > 1024000) {
        this.$message('文件大小超过限制')
        return false
      }
    },
    single_success(res, file, filelist) {
      this.$message('上传成功！')
      this.itemList = filelist
    },
    /* 删除已上传列表 */
    single_handleRemove(file) {},
    /* 点击文件列表中已上传的文件时的钩子 */
    single_handlePreview(file) {
      console.log(file)
    },
    /* 文件超出个数限制时的钩子 */
    single_handleExceed(files, fileList) {
      console.log(files)
      console.log(fileList)
      this.$message.warning(`当前限制选择单个文件,请先删除${fileList[0].name}再进行重新上传！`)
    },
    /* 删除文件前 */
    single_beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    /* 上传之前 */
    multi_beforeUpload(file) {},
    multi_change(file, fileList) {},
    multi_success(res, file, filelist) {
      this.$message('上传成功！')
      this.itemList = filelist
    },
    /* 删除已上传列表 */
    multi_handleRemove(file) {},
    /* 点击文件列表中已上传的文件时的钩子 */
    multi_handlePreview(file) {
      console.log(file)
    },
    /* 文件超出个数限制时的钩子 */
    multi_handleExceed(files, fileList) {
      console.log(files)
      console.log(fileList)
      this.$message.warning('文件个数超限!')
    },
    /* 删除文件前 */
    multi_beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    /* 原生input上传 */
    test() {
      if (!this.$refs.test.files.length) return
      if (this.$refs.test.files.length > 9) {
        alert('最多同时只可上传9张图片')
        return
      }
      const imgFile = this.$refs.test.files
      imgFile.forEach((file, i) => {
        if (!/\/(?:jpeg|png)/i.test(file.type)) return
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          var li = document.createElement('li')
          li.innerHTML = `<div class="progress"><span><img src="${e.target.result}" alt=""></span></div>`
          document.querySelector('.img-list').append(li)
        }
      })
    },
    blobStream() {
      // const bsFile = this.$refs.test2.files
      // const fileStr = null
      // const audioData = new FormData()
      // audioData.append('file', bsFile[0])
      // console.log(audioData)
      // const reader = new FileReader()
      // // reader.readAsText(bsFile[0], 'UTF-8')
      // reader.readAsDataURL(bsFile[0], 'UTF-8')
      // reader.onload = () => {
      //   console.log('reader.content', reader.result)
      //   this.$axios
      //     .post('/api/file/uploadStr', {
      //       file: reader.result,
      //       fileName: bsFile[0].name
      //     })
      //     .then((res) => {
      //       console.log(res)
      //     })
      // }

      const bsFile = this.$refs.test2.files
      fileToBase64(bsFile[0]).then((ele) => {
        base64toFile(ele).then((res) => {
          const audioData = new FormData()
          audioData.append('file', bsFile[0])
          console.log('params', audioData)
          this.$axios.post('/api/file/uploadStr', audioData).then((res) => {
            console.log(res)
          })
        })
      })
      // this.$axios.post('/api/file/uploadStr', params).then((res) => {
      //   console.log(res)
      // })

      // this.$axios.post('/api/file/uploadStr', params).then((res) => {
      //   console.log(res)
      // })
      // this.$httpPost('file/upload', audioData).then(res => {
      //   console.log(res)
      // })
    },
    transBaseToFile() {
      if (!this.needBaseString) return
      const getFile = base64toFile(this.needBaseString)
      var reader = new FileReader() // 创建文件读取对象
      reader.readAsDataURL(getFile)
      // 监听文件读取结束后事件
      const _this = this
      reader.onloadend = function (e) {
        const timer = setTimeout(() => {
          _this.imageUrl = e.target.result
          clearTimeout(timer)
        }, 500)
      }
    },
    transPic() {
      const transFile = this.$refs.transFile.files
      fileToBase64(transFile[0]).then((ele) => {
        console.log('transFile', transFile)
        this.transBaseString = ele
      })
    },
    copyString() {
      if (!this.transBaseString) return false
    },
    preView() {
      const _ = this
      this.$axios({
        method: 'get',
        url: '/api/file/download',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        responseType: 'blob'
      }).then((res) => {
        setTimeout(() => {
          _.pdfSrc = _.getObjectURL(res.data)
          console.log(_.pdfSrc)
        }, 500)
      })
    },
    preViewBase64() {
      const _ = this
      this.$axios({
        method: 'post',
        url: '/api/file/downloadImg',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        responseType: 'blob'
      }).then((res) => {
        const reader = new FileReader()
        reader.readAsDataURL(res.data)
        reader.onload = (e) => {
          _.imgBase64Src = 'data:image/jpg;base64,' + e.target.result.split(',')[1]
        }
      })
    },
    downLoad() {
      this.$axios({
        method: 'post',
        url: '/api/file/download',
        headers: {
          'Content-Type': 'application/octet-stream'
        },
        responseType: 'blob'
      })
        .then((response) => {
          this.downloadFile(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 将返回的流数据转换为url
    getObjectURL(file) {
      let url = null
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        try {
          url = window.webkitURL.createObjectURL(file)
        } catch (error) {}
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file)
        } catch (error) {}
      }
      return url
    },
    downloadFile(res) {
      if (!res.data) {
        return
      }
      const blob = new Blob([res.data], {
        type: 'application/actet-stream;charset=utf-8'
      })
      // for IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(
          blob,
          res.headers['content-disposition'].split(';')[1].split('filename=')[1]
        )
      } else {
        // for Non-IE (chrome, firefox etc.)
        const objectUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = objectUrl
        // a.download = res.headers['content-disposition'].split(';')[1].split('filename=')[1]
        a.download = 'a.pdf'
        // a.click();
        // 下面这个写法兼容火狐
        a.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          })
        )
        window.URL.revokeObjectURL(blob)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.previewImg {
  ul {
    padding-left: 15px;
    li {
      .prew-desp {
        margin: 15px auto;
      }
    }
  }
}
.prew-img {
  width: 300px;
  height: 150px;
}
.fileTest {
  position: absolute;
  opacity: 0;
  width: 80px;
  height: 32px;
  z-index: 3;
}
.el-button {
  text-align: center;
  position: absolute;
}
.fileBox {
  height: 30px;
  position: relative;
}
.under_line {
  width: 100%;
  height: 5px;
  font-size: 12px;
  border-bottom: 1px dashed #333;
  margin: 20px auto;
}
h1 {
  font-size: 24px;
  margin: 10px auto;
}
.upload-demo {
  margin-bottom: 40px;
}
.el-upload__tip {
  margin-left: 85px;
}
.m-link-left {
  margin-left: 15px;
}
.tranImgPreview {
  width: 300px;
}
</style>
