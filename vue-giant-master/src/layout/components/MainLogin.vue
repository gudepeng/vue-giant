<template>
  <el-dialog
    :visible.sync="showLogin"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="25%"
  >
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
    >
      <el-form-item prop="username" label="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          type="text"
        />
      </el-form-item>
      <el-form-item prop="password" label="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
        />
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'MainLogin',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false,
      showLogin: false,
      onWeb: new Date(),
      timeout: 60000
    }
  },
  created() {
    this.initLogin()
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.showLogin = false
      })
    },
    initLogin() {
      setInterval(() => {
        const now = new Date()
        if (now - this.onWeb > this.timeout) {
          this.showLogin = true
        }
      }, 20 * 1000)
    },
    doOnWeb() {
      this.onWeb = new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  padding: 0px;
}
</style>
