<template>
  <div class="panel">
    <div class="login-panel">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
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
      loading: false
    }
  },
  created() {},
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          await this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/home' })
            // window.history.pushState({}, '', '/home')
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-panel {
    width: 400px;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    padding: 30px;
    background-color: #e5e5e5;
  }
}
</style>
