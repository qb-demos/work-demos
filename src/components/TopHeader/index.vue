<template>
  <div class="wrap">
    <div>
      <div class="Menu-icon-wrap"
           @click="onMenuCollapse">
        <el-icon>
          <Menu />
        </el-icon>
      </div>
    </div>
    <div>
      <el-switch v-model="dark"
                 inline-prompt
                 size="large"
                 style="--el-switch-on-color: #2c2c2c;"
                 :active-icon="Moon"
                 :inactive-icon="Sunny"
                 @change="changeTheme" />
    </div>
  </div>
</template>

<script setup>
import useAppStore from '../../store/modules/app'
import { Sunny, Moon, Menu } from '@element-plus/icons-vue'

const dark = ref(false)
const appStore = useAppStore()

function onMenuCollapse () {
  appStore.setMenuCollapse()
}

function changeTheme (val) {
  appStore.setTheme(val)
}
</script>

<style lang='scss' scoped>
.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .Menu-icon-wrap {
    display: flex;
    height: 100%;
    width: 32px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
