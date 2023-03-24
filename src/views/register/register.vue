<template>
  <div class="register">
    <div class="cc">123</div>
    <div class="register-form">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="用户名:" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入6-20位用户名"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入2-16位真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input type="password" placeholder="请输入6-20密码" v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passWordConfirm">
          <el-input
            type="password"
            placeholder="请再次输入密码"
            v-model="form.passWordConfirm"
          ></el-input>
        </el-form-item>
        <div class="left_margin">
          <el-button @click="Register('form')">注册</el-button>
          <el-button @click="goLogin">去登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { perUserRegister } from '@api/api'
export default {
  data() {
    return {
      form: {
        userName: '',
        passWord: '',
        realName: '',
        passWordConfirm: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        passWordConfirm: [
          { required: true, message: '请再次确认密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    Register(formName) {
      if (this.form.passWord !== this.form.passWordConfirm) {
        this.$message('两次输入密码不一致!')
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await perUserRegister(this.form)
          this.$message('注册成功!')
          this.$router.push({
            path: '/login'
          })
        }
      })
    },
    goLogin() {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
<style lang="scss">
@import url('./index.scss');
.left_margin {
  margin-left: 100px;
}
</style>
