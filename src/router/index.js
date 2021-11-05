import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeCom from '@/layout/Home.vue'
import store from '@/store'

Vue.use(VueRouter)

const files = require.context('../pages', true, /index.vue$/)
const pages = files.keys().map(fileName => {
  const name = fileName.split('/')[1]
  const path = `/${name}`
  return { name, path, component: files(fileName).default }
})
// console.log('%c pages: ', 'background-color: pink', pages)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeCom
  },
  {
    path: '/home',
    name: 'home',
    component: HomeCom,
    children: pages
  }
]

// 导航菜单使用
store.commit('setRoutes', routes)

const router = new VueRouter({ routes })

export default router
