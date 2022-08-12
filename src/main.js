import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'

import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言
// element-plus 自定义主题文件
import './styles/element/index.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, { locale })
app.mount('#app')
