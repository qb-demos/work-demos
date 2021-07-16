<template>
  <div class="header" :style="{ 'background-color': '#242f42' }">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">
      <span style="position:relative;top:-2px;">DEMO</span>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 更新日志 -->
        <div class="btn-feedback" style="margin-left: 20px;">
          <el-tooltip effect="light" content="更新日志" placement="bottom">
            <i class="el-icon-notebook-2"></i>
          </el-tooltip>
        </div>
        <!-- 反馈 -->
        <div class="btn-feedback" @click="handleFeedback" style="margin-left: 20px;">
          <el-tooltip effect="light" content="系统问题反馈" placement="bottom">
            <i class="el-icon-chat-dot-square"></i>
          </el-tooltip>
        </div>
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen" style="margin-left: 20px;">
          <el-tooltip effect="light" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-full-screen"></i>
          </el-tooltip>
        </div>
      </div>
    </div>

    <!-- 系统问题反馈 -->
    <el-dialog title="系统问题反馈" :visible.sync="feedbackData.feedbackDialogVisible" width="500px">
      <el-form :model="feedbackData" label-width="80px">
        <el-form-item label="页面名称">
          <el-input v-model="feedbackData.errPage" autocomplete="off" placeholder="这是关于哪个页面的反馈"></el-input>
        </el-form-item>
        <el-form-item label="详细描述">
          <el-input
            v-model="feedbackData.errDetail"
            type="textarea"
            autocomplete="off"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请详细描述您遇到的问题或建议"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="feedbackData.feedbackDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="feedbackData.feedbackDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bus from '../common/js/bus'

export default {
  data () {
    return {
      collapse: false,
      fullscreen: false,
      name: '用户名',
      feedbackData: {
        feedbackDialogVisible: false,
        errPage: '',
        errDetail: '',
        contactAddress: ''
      }
    }
  },
  methods: {
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    // 反馈
    handleFeedback () {
      this.feedbackData.feedbackDialogVisible = true
      // const path = this.$route.path
      // const itemIndex = this.$store.state.tagsList.findIndex(v => v.path === path)
      // this.feedbackData.errPage = this.$store.state.tagsList[itemIndex].title
    },
    feedbackSubmit () {
      if (this.feedbackData.errPage === '') {
        this.$message.warning(`请输入页面名称！`)
      } else if (this.feedbackData.errDetail === '') {
        this.$message.warning(`请输入详细描述！`)
      } else {
        const obj = {
          'err_page': this.feedbackData.errPage,
          'err_detail': this.feedbackData.errDetail,
          'contact_addr': this.feedbackData.contactAddress
        }
        console.log(obj)
      }
    }
  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage()
    }
  }
}
</script>

<style scoped lang="less">
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  /* background-color: #242f42; */
  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
  .logo {
    float: left;
    height: 100%;
    display: flex;
    align-items: center;
    > span {
      vertical-align: center;
    }
  }
  .header-right {
    float: right;
    padding-right: 30px;
    .header-user-con {
      display: flex;
      height: 70px;
      align-items: center;
      .btn-feedback,
      .btn-fullscreen {
        cursor: pointer;
      }
      .user-name {
        margin-left: 20px;
      }
      .user-avator {
        margin-left: 20px;
        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
  }
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.update-item {
  line-height: 1.5;
  color: #5e6d82;
  font-size: 13px;
  text-indent: 10px;
}
</style>
