/*
 * @Author: zhanghongqiao
 * @Date: 2018-06-04 19:41:01
 * @Email: 991034150@qq.com
 * @Description: 入口文件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-06-30 11:45:16
 */

import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable';  
import PortalVue from "portal-vue";
import elementUI from 'element-ui'
import VueAddition from "@/addition";
import App from './containers/app.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
import './assets/styles/index.scss' 
 
  
// 渲染前处理(引入所有API)
import preLoader from './utils/loader/loader'
import mockAPI from './api/mockIndex'
  
// ========================================================
// Mock & Config Setup
// 渲染前设置配置项和mock API，config为子模块配置项
// ========================================================
preLoader.load({
  config: {},
  apis: mockAPI
})
 
// 注册lodash
Vue.use(_)  
Vue.use(elementUI); 
Vue.use(PortalVue)
Vue.use(VueAddition)
Vue.component('vue-draggable-resizable', VueDraggableResizable); 
 
new Vue({
  el: '#app',
  // 路由
  router,
  /* 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件store,
   * 子组件使用方式 this.$store.state.count
   */
  store,
  components: { App },
  template: '<App/>'
})

// ================= 启用热加载=============
if(module.hot) {
  module.hot.accept()
}
