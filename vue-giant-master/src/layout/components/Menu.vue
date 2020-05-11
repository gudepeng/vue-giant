<template>
  <div class="menu-panel">
    <div class="left-menu">
      <div class="all-menu" @click="toggleTwoMenu">
        <i class="el-icon-s-grid"></i>
        <span>子系统</span>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div>
        <template v-for="collectMenu in collectMenus">
          <div class="collect-menu" :key="collectMenu.path" @click="toMenu(collectMenu.path)">{{collectMenu.title}}</div>
        </template>
      </div>
    </div>
    <div class="two-menu" v-show="showTwoMenu">
      <template v-for="(menu, index1) in menus">
        <div class="onetitle" :key="menu.appPath">{{menu.title}}</div>
        <template v-for="(cmenu, index2) in menu.child">
          <div class="twotitle" :key="menu.appPath + cmenu.path">
            <div @click="clickMenu(menu,cmenu)">{{cmenu.title}}</div>
            <div>
              <i v-if="!cmenu.onweb" class="el-icon-star-off" @click="addCollectMenu(menu,cmenu,index1,index2)"></i>
              <i v-else class="el-icon-star-on" @click="delCollectMenu(menu,cmenu,index1,index2)"></i>
            </div>
          </div>
        </template>
      </template>
    </div>
    <div class="background-menu" @click="hiddenPanel"></div>
  </div>
</template>

<script>
import menuConfig from '@/menu/index.js'
export default {
  name: 'Menu',
  data () {
    return {
      collectMenus: this.$store.state.user.collectMenus,
      menus: [],
      showTwoMenu: false
    }
  },
  created () {
    this.menus = menuConfig
  },
  methods: {
    hiddenPanel () {
      this.$parent.toggleMenu()
    },
    toggleTwoMenu () {
      this.showTwoMenu = !this.showTwoMenu
    },
    clickMenu (menu, cmenu) {
      this.toMenu(`/${menu.appPath}${cmenu.path}`)
    },
    toMenu (path) {
      this.hiddenPanel()
      window.history.pushState({}, '', path)
    },
    addCollectMenu (menu, cmenu, index1, index2) {
      const data = {
        title: cmenu.title,
        path: `/${menu.appPath}${cmenu.path}`
      }
      this.$store.commit('user/SET_COLLECT_MENU', data)
      const me = this.menus
      me[index1].child[index2].onweb = true
      this.menus = JSON.parse(JSON.stringify(me))
    },
    delCollectMenu (menu, cmenu, index1, index2) {
      const data = {
        title: cmenu.title,
        path: `/${menu.appPath}${cmenu.path}`
      }
      this.$store.commit('user/DEL_COLLECT_MENU', data)
      const me = this.menus
      me[index1].child[index2].onweb = false
      this.menus = JSON.parse(JSON.stringify(me))
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-panel {
  width: 100%;
  display: flex;
  .left-menu {
    width: 240px;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 4px 0px;
    background-color: rgb(255, 255, 255);
    z-index: 100;
    .all-menu {
      display: flex;
      height: 50px;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      > i {
        margin: 0px 10px;
      }
      > span {
        text-align: left;
        width: 168px;
      }
    }
    .collect-menu {
      display: flex;
      margin: 10px 0px 10px 35px;
      cursor: pointer;
    }
  }
  .two-menu {
    z-index: 99;
    width: 700px;
    height: 100%;
    background-color: rgb(247, 247, 247);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .onetitle {
      margin: 20px 20px 10px 20px;
      width: 150px;
      text-align: left;
    }
    .twotitle {
      margin: 5px 20px 5px 30px;
      width: 140px;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      cursor: pointer;
      & > div:last-child {
        margin-left: auto;
        margin-right: 5px;
      }
    }
  }
  .background-menu {
    background-color: rgba(0, 0, 0, 0.2);
    flex: 1;
  }
}
</style>
