<template>
  <div class="page-wrap">
    <div class="slider">
      <MenuCom></MenuCom>
    </div>
    <div class="content-wrap">
      <TopHeader class="top-head"></TopHeader>
      <div class="content">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuCom from '../components/LeftMenu/index.vue'
import TopHeader from '../components/TopHeader/index.vue'

// const props = defineProps()
// const value = ref()

// function fn () {}
</script>

<style lang='scss' scoped>
.page-wrap {
  display: flex;

  .slider {
    height: 100%;
  }

  .content-wrap {
    flex: 1;
    height: 100%;
    width: 0;
    position: relative;
    // padding: 15px;

    .top-head {
      width: 100%;
      height: 60px;
      padding: 15px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
    }

    .content {
      width: 100%;
      height: 100%;
      // padding: 15px;
      // padding-top: 75px;
    }
  }
}
</style>
