/*
 * @Author: zhanghongqiao 
 * @Date: 2021-07-01 15:44:29 
 * @Email: 991034150@qq.com 
 * @Description: 预览
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-05 14:15:56
 */

<template>
  <div class="poster-editor" :class="{ 'init-loading': initLoading }">
    <div class="base">
      <main-component ref="main" />
    </div> 
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'poster/poster.vuex'
 
import mainComponent from 'poster/main/mainPanel' 
import store from '@/store'
import posterModule from 'poster/vuexModule/poster'
 

export default {
  components: { 
    mainComponent, 
  },
  data() {
    return {
      initLoading: false
    }
  },
  computed: {
    ...mapState([
      'posterItems',
      'layerPanelOpened',
      'activeItems',
      'copiedWidgets',
      'referenceLineOpened',
      'isUnsavedState'
    ]),
    ...mapGetters(['activeItemIds'])
  },
  beforeRouteLeave(to, from, next) {
    if (this.isUnsavedState) {
      const answer = window.confirm(
        '当前页面配置未保存,退出将不会保存,是否继续退出？'
      )
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  beforeCreate() {
    if (!store.hasModule('poster')) {
      /** 注册poster-vuex模块 */
      store.registerModule('poster', posterModule)
    }
  },
  async created() {
    this.initLoading = true
    // if (!store.hasModule('poster')) return
    const loading = this.$loading({
      lock: true,
      text: '正在初始化编辑器',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.6)'
    })
    await this.resetState()
    loading.close()
    this.initLoading = false
  },
  async mounted() {
    document.addEventListener('keydown', this.keydownHandle)
    this.body = document.body
    this.mainPanelRef = this.$refs.main.$refs.mainPanel
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydownHandle)
    this.killAutoSaveTask()
  },
  methods: {
    ...mapActions([
      'replacePosterItems',
      'replaceActiveItems',
      'pasteWidget',
      'copyWidget',
      'setLayerPanel',
      'setReferenceLineVisible',
      'resetState'
    ]),
    ...mapActions({
      undo: 'history/undo',
      redo: 'history/redo',
      backupInit: 'backup/init',
      killAutoSaveTask: 'backup/killAutoSaveTask',
      backupInvoker: 'backup/invoker'
    }), 
  }
}
</script>

<style lang="scss" scoped>
.poster-editor {
  width: 100%;
  min-width: 900px;
  height: 100%;
  background-color: #fff;
  position: fixed;
  &.init-loading {
    filter: blur(6px);
  }
  .base {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
  }
  .left-side {
    height: 100%;
  }
  .poster-editor-main {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
  }
  .extend-side-bar {
    width: 50px;
    height: 100%;
    border-left: 1px solid $colorBorder;
  }
  .poster-editor-control {
    width: 200px;
    height: 100%;
    box-sizing: border-box;
    border-left: 1px solid $colorBorder;
  }
}
</style>
