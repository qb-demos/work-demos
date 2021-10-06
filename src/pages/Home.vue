<template>
  <div class="home wrapper">
    <div class="header-com">
      <PageHeader />
    </div>
    <div class="main-wrapper">
      <div class="slider">
        <PageSlider />
      </div>
      <div class="main">
        <!-- <DiffEditor
          :originalValue="originalValue"
          :modifiedValue="modifiedValue"
          :options="options"
        ></DiffEditor> -->
        <!-- <EditorCom :value="value" :options="options"></EditorCom> -->
        <!-- <TreeTable></TreeTable> -->
        <MarkDown></MarkDown>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PageSlider from '@/components/PageSlider.vue'
import PageHeader from '@/components/PageHeader.vue'
// import EditorCom from './EditorCom'
// import DiffEditor from './EditorCom/DiffEditor'
// import TreeTable from './TreeTable'
import MarkDown from './MarkDown'
import * as testValue from './EditorCom/testValue'

export default {
  name: 'home',
  components: {
    PageSlider,
    PageHeader,
    MarkDown
    // TreeTable
    // EditorCom
    // DiffEditor
  },
  data () {
    return {
      options: { find: true },
      value: testValue.sql,
      originalValue: testValue.sql,
      modifiedValue: testValue.sql2
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  .header-wrapper {
    flex: 0 0 70px;
  }
  .main-wrapper {
    flex: 1;
    height: 0;
    display: flex;
    .slider {
      height: 100%;
    }
    .main {
      height: 100%;
      flex: 1;
      width: 0;
      background-color: #f1f3f4;
    }
  }
}
</style>
