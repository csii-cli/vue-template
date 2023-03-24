<template>
  <div>
    <el-upload
      :limit="1"
      :multiple="false"
      :auto-upload="false"
      class="upload-demo"
      action="/api/file/upload"
      :file-list="fileList"
      :on-preview="single_handlePreview"
      :on-remove="single_handleRemove"
      :before-remove="single_beforeRemove"
      :before-upload="single_beforeUpload"
      :on-change="handleChange"
      accept=".xlsx, .xls, .txt"
      :on-exceed="single_handleExceed"
      :on-success="single_success"
      :list-type="'text'"
      :submit="a_submit"
    >
      <el-button size="small" type="primary">选择xlsx文件</el-button>
      <div slot="tip" class="el-upload__tip">.xlsx,不超过1M</div>
    </el-upload>
    <el-button size="small" type="primary" @click="a_submit">解析</el-button>
    <el-button size="small" type="primary" v-copy="jsonStr" @click="copyData">复制</el-button>
    <div>
      <el-input
        type="textarea"
        :rows="20"
        size="medium"
        v-model="jsonStr"
        placeholder="请输入1-20评论"
        clearable
      ></el-input>
    </div>
  </div>
</template>

<script>
import * as xlsx from 'xlsx'
import { readFile } from '@/libs/util'
export default {
  name: 'm-parse',
  data() {
    return {
      itemList: [],
      fileList: [],
      jsonStr: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    async a_submit() {
      if (this.fileList.length === 0) {
        return
      }
      const dataBinary = await readFile(this.fileList[0].raw)
      const workBook = xlsx.read(dataBinary, { type: 'binary', cellDates: true })
      const workSheet = workBook.Sheets[workBook.SheetNames[0]]
      const data = xlsx.utils.sheet_to_json(workSheet)
      console.log(data) // 这里已经能拿到转换后的json
      const dataNew = [] // 新数组
      data.map((item) => {
        const _item = JSON.parse(
          JSON.stringify(item).replace('MCC', 'value').replace('商户类型', 'text')
        )
        dataNew.push(_item)
      })
      this.jsonStr = JSON.stringify(dataNew)
    },
    copyData() {
      if (!this.jsonStr) return false
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
    handleChange(files, fileList) {
      this.fileList = fileList
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
    }
  }
}
</script>

<style lang="less" scoped></style>
