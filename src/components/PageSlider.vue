<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :collapse="collapse"
      :background-color="'#324157'"
      :text-color="'#fff'"
      :active-text-color="'#20a0ff'"
      unique-opened
      router
    >
      <el-menu-item v-for="route in routes" :key="route" :index="route">
        <i class="el-icon-document"></i>
        <span slot="title">{{ route }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/js/bus'

export default {
  data () {
    return {
      collapse: false,
      items: []
    }
  },
  computed: {
    routes () {
      const allRoutes = this.$store.state.routes
      const homeCom = allRoutes.find(v => v.path === '/home')
      return homeCom.children.map(v => v.name)
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style scoped lang="less">
.sidebar {
  height: 100%;
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  > ul {
    height: 100%;
    .doc {
      flex: 0 0 56px;
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
      align-items: center;
      font-size: 14px;
      color: #fff;
      > .icon {
        width: 24px;
        font-size: 18px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
}
</style>
