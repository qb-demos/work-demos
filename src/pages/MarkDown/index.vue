<template>
  <div>
    <!-- <VueMarkdown :source="source"></VueMarkdown> -->
    <SourceCom class="markdown-body"></SourceCom>
  </div>
</template>

<script>
// import VueMarkdown from 'vue-markdown'
import SourceCom from './index.md'

export default {
  name: 'MarkDown',
  components: { SourceCom },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang="less">
.com {
  h1 {
    margin: 15px 0;
  }
}
</style>
