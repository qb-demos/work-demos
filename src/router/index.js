import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: 'element',
        name: 'element',
        component: () => import('../views/element/index.vue')
      },
      {
        path: 'three',
        name: 'three',
        component: () => import('../views/three/index.vue')
      },
      {
        path: 'harp',
        name: 'harp',
        component: () => import('../views/harp/index.vue')
      },
      {
        path: 'others',
        name: 'others',
        redirect: '/others/suncalc',
        children: [
          {
            path: 'suncalc',
            name: 'suncalc',
            component: () => import('../views/others/suncalc/index.vue')
          },
          {
            path: 'canvas-light',
            name: 'canvas-light',
            component: () => import('../views/others/canvas-light/index.vue')
          },
          {
            path: 'bubbles',
            name: 'bubbles',
            component: () => import('../views/others/bubbles/index.vue')
          },
          {
            path: 'book-imgs',
            name: 'book-imgs',
            component: () => import('../views/others/book-imgs/index.vue')
          },
          {
            path: 'water-mark',
            name: 'water-mark',
            component: () => import('../views/others/water-mark/index.vue')
          },
          {
            path: 'echarts',
            name: 'echarts',
            component: () => import('../views/others/echarts/index.vue')
          },
          {
            path: 'echarts-bin-zhou',
            name: 'echarts-bin-zhou',
            component: () => import('../views/others/echarts/bin-zhou.vue')
          },
          {
            path: 'g6',
            name: 'g6',
            component: () => import('../views/others/g6/index.vue')
          }
        ]
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
