
<template>
  <div class="panel" @click="doOnWeb" @keydown="doOnWeb">
    <top-header class="panel-heder"></top-header>
    <div class="panel-main">
      <router-view v-if="showView" />
      <div v-else id="root-view"></div>
    </div>
    <main-menu ref="mainMenu" class="main-menu" v-show="showMenu"></main-menu>
    <main-login ref="mainLogin"></main-login>
  </div>
</template>

<script>
import TopHeader from '@/layout/components/Header'
import MainMenu from '@/layout/components/Menu'
import MainLogin from '@/layout/components/MainLogin'

// 导入乾坤函数
import {
  registerMicroApps,
  runAfterFirstMounted,
  start
} from 'qiankun'

export default {
  name: 'Layout',
  components: {
    TopHeader,
    MainMenu,
    MainLogin
  },
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    showView: function () {
      return this.$route.path === '/home'
    }
  },
  mounted() {
    // 定义传入子应用的数据
    const msg = {
      data: this.$store.getters,
      fns: []
    }
    // 注册子应用
    registerMicroApps(
      [
        {
          name: 'module-app1',
          entry: '//localhost:8081',
          container: '#root-view',
          activeRule: '/app1',
          props: msg
        },
        {
          name: 'module-app2',
          entry: '//localhost:8082',
          container: '#root-view',
          activeRule: '/app2',
          props: msg
        }
      ],
      {
        beforeLoad: [
          app => {
            console.log('before load', app)
          }
        ],
        beforeMount: [
          app => {
            console.log('before mount', app)
          }
        ],
        afterUnmount: [
          app => {
            console.log('after unload', app)
          }
        ]
      }
    )

    // 第一个子应用加载完毕回调
    runAfterFirstMounted(() => {
      console.log('runAfterFirstMounted')
    })
    // 启动微服务
    start({ prefetch: true })
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
      this.$refs['mainMenu'].showTwoMenu = false
    },
    doOnWeb() {
      this.$refs.mainLogin.doOnWeb()
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .panel-heder {
    height: 50px;
    line-height: 50px;
  }
  .panel-main {
    width: 100%;
    height: calc(100% - 50px);
    overflow: hidden;
    display: flex;
    #root-view {
      width: 100%;
      height: 100%;
      margin: 0px;
      padding: 0px;
      ::v-deep > div {
        height: 100%;
      }
    }
  }
  .main-menu {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 51px;
    bottom: 0px;
  }
}
</style>>
