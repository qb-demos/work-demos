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
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <!-- 空元素用来让接口文档部分贴底 -->
      <li style="flex:1;"></li>
      <el-menu-item>
        <router-link to="/doc" target="_blank" class="doc">
          <i class="el-icon-tickets icon" style="'color:#455368'"></i>
          <span>接口文档</span>
        </router-link>
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
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
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
