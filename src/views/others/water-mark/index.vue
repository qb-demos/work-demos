<template>
  <div class="page-wrap">
    <div class="config-wrap">
      <el-form label-width="120px">
        <el-form-item label="水印文案">
          <el-input v-model="watermarkText"></el-input>
        </el-form-item>
        <el-form-item label="字体颜色">
          <el-input v-model="fontColor"></el-input>
        </el-form-item>
        <el-form-item label="透明度">
          <el-input-number v-model="opacity"
                           :min="0"
                           :max="1"
                           :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label="字体大小">
          <el-input-number v-model="fontSize"
                           :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="水印框宽度">
          <el-input-number v-model="canvasWidth"
                           :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="水印框高度">
          <el-input-number v-model="canvasHeight"
                           :min="0"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="addWatermark">添加水印</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="img-wrap">
      <el-upload class="upload-demo"
                 drag
                 action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                 multiple>
        <el-icon>
          <UploadFilled />
        </el-icon>
        <div class="el-upload__text">
          拖拽文件到这里 或者 <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            支持 jpg/png 文件
          </div>
        </template>
      </el-upload>
    </div>
  </div>
</template>

<script>
// http://watermark.dxcweb.com/
import { ref } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';

export default {
  setup () {
    const watermarkText = ref('');
    const fontColor = ref('#000');
    const opacity = ref(0.5);
    const fontSize = ref(20);
    const canvasWidth = ref(200);
    const canvasHeight = ref(200);

    const addWatermark = () => {
      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth.value;
      canvas.height = canvasHeight.value;
      const ctx = canvas.getContext('2d');
      ctx.font = `${fontSize.value}px Arial`;
      ctx.fillStyle = fontColor.value;
      ctx.globalAlpha = opacity.value;
      ctx.rotate(-20 * Math.PI / 180);
      ctx.fillText(watermarkText.value, 50, 120);
      const url = canvas.toDataURL();
      document.body.style.backgroundImage = `url(${url})`;
    };

    return {
      watermarkText,
      fontColor,
      opacity,
      fontSize,
      canvasWidth,
      canvasHeight,
      addWatermark,
    };
  },
};
</script>

<style lang='scss' scoped></style>
