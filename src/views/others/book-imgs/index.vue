<template>
  <div class="page-wrap">
    <div :style="{ width: pageWidth * 2 + 30 + 16 + 'px', height: pageHeight + 9 + 'px' }"
         class="book-wrap">
      <div ref="bookArea"
           class="book-area">
        <div v-for="(img, i) in imgs"
             :key="i"
             class="book-page">
          <div class="page-inner">
            <div class="name">{{ img.name }}</div>
            <div class="image-wrap">
              <img :src="img.url"
                   :alt="i">
            </div>
            <div class="page-num">{{ i + 1 }}-{{ imgs.length }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="book-control">
      <el-input placeholder="图件名称"
                style="width: 200px;margin-right: 20px;"></el-input>
      <el-icon @click="toPrev"
               style="margin-right: 20px;cursor: pointer;">
        <ArrowLeftBold />
      </el-icon>
      <el-icon @click="toNext"
               style="margin-right: 20px;cursor: pointer;">
        <ArrowRightBold />
      </el-icon>
      <div>
        跳转到
        <el-input v-model="pageNum"
                  type="number"
                  min="0"
                  style="width: 50px;"
                  @keyup.enter="toPage"></el-input>
        页
      </div>
    </div>
  </div>
</template>

<script setup>
import { PageFlip } from 'qb-flip-book'
import 'qb-flip-book/dist/style.css'

import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import img01 from './imgs/img (1).jpg'
import img02 from './imgs/img (2).jpg'
import img03 from './imgs/img (3).jpg'
import img04 from './imgs/img (4).jpg'
import img05 from './imgs/img (5).jpg'
import img06 from './imgs/img (6).jpg'
import img07 from './imgs/img (7).jpg'
import img08 from './imgs/img (8).jpg'
import img09 from './imgs/img (9).jpg'
import img10 from './imgs/img (10).jpg'
import img11 from './imgs/img (11).jpg'
import img12 from './imgs/img (12).jpg'
import { nextTick } from 'vue'

const imgs = [{ url: img01, name: 'img01' }, { url: img02, name: 'img02' }, { url: img03, name: 'img03' }, { url: img04, name: 'img04' }, { url: img05, name: 'img05' }, { url: img06, name: 'img06' }, { url: img07, name: 'img07' }, { url: img08, name: 'img08' }, { url: img09, name: 'img09' }, { url: img10, name: 'img10' }, { url: img11, name: 'img11' }, { url: img12, name: 'img12' }]
const bookArea = ref(null)
const pageWidth = 500
const pageHeight = 700
const pageFlip = ref(null)
function init () {
  pageFlip.value = new PageFlip(bookArea.value, {
    width: pageWidth, // required parameter - base page width
    height: pageHeight, // required parameter - base page height
    showCover: false,
    // MaxShadowOpacity: 1,
    flippingTime: 400 // 翻转动画时间，单位毫秒
  })
  pageFlip.value.loadFromHTML(document.querySelectorAll('.book-page'))
}
function toPrev () {
  pageFlip.value.flipPrev()
}
function toNext () {
  pageFlip.value.flipNext()
}
const pageNum = ref(0)
function toPage () {
  nextTick(() => {
    pageFlip.value.flip(Number(pageNum.value))
  })
}

onMounted(() => {
  init()
})
onBeforeUnmount(() => { })
</script>

<style lang='scss' scoped>
.page-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .book-wrap {
    padding: 1px 15px;
    background: repeating-linear-gradient(90deg, var(--el-bg-color), #e2e2e2 1px, var(--el-bg-color) 3px, #9a9a9a 1px);
    border-radius: 6px;
    border: 4px solid #515378;
    border-left-width: 8px;
    border-right-width: 8px;
  }

  .book-area {
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    background-color: #fff;

    .book-page {
      box-shadow: inset 0px 0 20px 2px rgba(0, 0, 0, 0.3);
      padding: 20px;

      &:nth-child(2n) {
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;

        &::before {
          content: '';
          width: 30px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, 0) 100%);
          z-index: 2;
          border-left: 1px solid #515378;
        }
      }

      &:nth-child(2n + 1) {
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;

        &::before {
          content: '';
          width: 30px;
          height: 100%;
          position: absolute;
          top: 0;
          right: 0;
          background: linear-gradient(to left, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, 0) 100%);
          z-index: 2;
          border-right: 1px solid #515378;
        }
      }

      .page-inner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        overflow: hidden;

        .name {
          font-size: 20px;
        }

        .image-wrap {
          flex: 1;
          height: 0;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .page-num {
          text-align: center;
          color: #777;
        }
      }
    }
  }

  .book-control {
    height: 32px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    color: var(--el-color-primary);
  }
}
</style>
