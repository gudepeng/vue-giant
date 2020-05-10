<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item)">
      <el-menu-item :index="url(item.path)">
        <template v-if="!isNest">
          <i :class="item.meta.icon"></i>
        </template>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else ref="subMenu" :index="url(item.path)">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
      </template>
      <menu-item
        v-for="child in item.children"
        :key="child.path"
        :isNest="true"
        :item="child"
        :basePath="url(item.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    url(path) {
      return this.basePath + (this.isNest ? '/' : '') + path
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          return true
        }
      })
      if (showingChildren.length === 0) {
        return true
      }

      return false
    }
  }
}
</script>
<style lang="scss">
.el-menu--collapse .el-submenu__title span {
  display: none;
}
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>
