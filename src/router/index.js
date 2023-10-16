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
        ]
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
