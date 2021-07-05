/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-29 21:07:35
 * @Description: 路由配置
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-01 15:47:46
 */

import Vue from 'vue'
import Router from 'vue-router'
 

// 注册Router
Vue.use(Router)
// 配置项
import config from '@/config/base.config'
 
// 首页
const Home = () => import('@/containers/posterEditor/index.vue')


const routes = [
  {
    path: '/',
    name: 'index',
    // redirect: `/index`,
    component: Home
  }, 
  {
    path: '/home',
    component: Home, 
    name: '首页'
  },{
    path: '/view',
    component: () => import('@/containers/posterView/index.vue'),
    name: '预览'
  }
]

export default new Router({
  // mode: 'history',
  base: config.routerPath,
  routes
})

 