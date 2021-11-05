<template>
  <div class="wrapper">
    <div class="page-title">格式化输入</div>
    <MaskedInput
      v-model="phone"
      mask="(+);(+);(+)"
      placeholder="Phone"
      @input="handleChanged"
    ></MaskedInput>
  </div>
</template>

<script>
import MaskedInput from 'vue-masked-input'

export default {
  name: 'MaskInput',
  components: { MaskedInput },
  props: {},
  data () {
    return {
      phone: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    handleChanged (val) {
      console.log('%c val: ', 'background-color: pink', val)
    }
  }
}
</script>

<style lang='less' scoped></style>
