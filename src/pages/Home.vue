<template>
  <div class="home">
    <PageHeader />
    <PageSlider />
  </div>
</template>

<script>
// @ is an alias to /src
import PageSlider from '@/components/PageSlider.vue'
import PageHeader from '@/components/PageHeader.vue'

export default {
  name: 'home',
  components: {
    PageSlider,
    PageHeader
  }
}
</script>
