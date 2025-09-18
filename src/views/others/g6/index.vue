<template>
  <div class="page-wrap">
    <div class="title">Model 01</div>
    <div class="model-section">
      <model-01 />
    </div>
    <div class="title">Model 02</div>
    <div class="model-section">
      <model-02 />
    </div>
    <div class="title">Model 03</div>
    <div class="model-section">
      <model-03 />
    </div>
  </div>
</template>

<script setup>
import model01 from './model-01/index.vue'
import model02 from './model-02.vue'
import model03 from './model-03.vue'

// const props = defineProps()
// const value = ref()

// function fn () {}

onMounted(() => {})
onBeforeUnmount(() => {})
</script>

<style lang="scss" scoped>
.page-wrap {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  height: 100%;
  padding: 15px;
  padding-top: 60px;

  .title {
    font-size: 20px;
  }

  .model-section {
    padding: 10px;
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
  }
}
</style>
