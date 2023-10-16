<template>
  <div class="page-wrap">
    <canvas id="flashCanvas"
            ref="refCanvas1"></canvas>
  </div>
</template>

<script setup>
import { init } from './index.js'

onMounted(() => {
  setTimeout(() => {
    const refCanvas1 = null
    console.log('%c refCanvas1.value: ', 'background-color: pink', refCanvas1.value)
    init(refCanvas1.value)
  }, 500)
})
onBeforeUnmount(() => { })
</script>

<style lang='scss' scoped></style>
