<template>
  <div class="menu-panel">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        :default-active="activeMenu"
        :collapse="isCollapse"
        class="el-menu-panel"
      >
        <menu-item v-for="route in routes" :isNest="false" :key="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
    <div class="collapse" @click="isCollapse = !isCollapse">
      <div class="collapse-icon">
        <i :class="isCollapse?'el-icon-arrow-right':'el-icon-arrow-left'"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuItem from './MenuItem'

export default {
  name: 'MenuPanel',
  components: { MenuItem },
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapGetters([
      'routes'
    ]),
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-panel {
  height: 100%;
  background-color: rgb(245, 245, 245);
  position: relative;
  ::v-deep .el-scrollbar {
    height: 100%;
  }
  ::v-deep .el-scrollbar__view {
    height: 100%;
  }
  ::v-deep .el-menu {
    height: 100%;
  }
  .el-menu-panel:not(.el-menu--collapse) {
    width: 240px;
  }
  .collapse {
    width: 0px;
    height: 66px;
    position: absolute;
    top: calc(50% - 56px);
    right: -12px;
    border-left: 12px solid #ebebeb;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    .collapse-icon {
      position: absolute;
      left: -13px;
      top: 22px;
    }
  }
}
</style>
