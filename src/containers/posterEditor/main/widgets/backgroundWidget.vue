<template>
  <vue-draggable-resizable
    ref="drag"
    :w="canvasSize.width"
    :h="canvasSize.height"
    :rotatable="false"
    :lock="item.lock"  >
    <div
      v-if="wState.isSolid"
      class="poster-editor-background"
      :style="{
        backgroundColor: wState.style.backgroundColor,
        width: '100%',
        height: '100%'
      }"
    />
    <img
      v-else
      ref="image"
      :src="wState.src"
      class="qr-code"
      style="width:100%;height:100%"
      ondragstart="return false"
    >
    <portal to="widgetControl">
      <common-control :key="item.id" :item="item" />
    </portal>
  </vue-draggable-resizable>
</template>

<script>
import vueDraggableResizable from 'poster/components/dragable/components/vue-draggable-resizable'
import { mapGetters, mapActions, mapState } from 'poster/poster.vuex'
import { BackgroundWidget } from 'poster/widgetConstructor'
import commonControl from 'poster/control/widgets/commonControl' 
export default {
  components: { vueDraggableResizable, commonControl },
 mixins: [BackgroundWidget.widgetMixin()],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isActive: true,
      draggable: true,
      resizable: true
    }
  },
  computed: {
    ...mapGetters(['activeItemIds']),
    ...mapState(['canvasSize', 'copiedWidgets']),
    dragInfo: {
      get() {
        return this.item.dragInfo
      },
      set(val) {
        this.item.dragInfo = val
      }
    },
    wState() { 
      return this.item.wState
    }
  },
  watch: {  
    activeItemIds(newVal) {
      if (newVal.length > 0) {
        this.isActive = false
      }
    }
  },
  methods: {
    ...mapActions([
      'removeBackground',
      'setBackgroundConfig',
      'pasteWidget',
      'replaceActiveItems',
      'selectAllItems',
      'updateBackgroundDragInfo'
    ]),
    ...mapActions({
      pushHistory: 'history/push'
    }),
    /**
     * @mixin
     */
    executeContextCommand(command) {
      if (command === 'remove') {
        if (!this.item.lock) {
          this.removeBackground(null)
        }
      } else if (command === 'lock') {
        this.setBackgroundConfig((config) => {
          config.lock = true
        })
      } else if (command === 'unlock') {
        this.setBackgroundConfig((config) => {
          config.lock = false
        })
      } else if (command === 'paste') {
        this.pasteWidget()
      } else if (command === 'selectAll') {
        this.selectAllItems()
      }
    },
    /**
     * @mixin
     * @return {MenuItem[]}
     */
    getMenuList() {
      const menuList = [{ label: '全选', command: 'selectAll' }]
      if (this.copiedWidgets) {
        menuList.unshift({ label: '粘贴', command: 'paste' })
      }
      if (!this.wState.isSolid) {
        if (this.item.lock) {
          menuList.unshift({ label: '解除锁定', command: 'unlock' })
        } else {
          menuList.unshift({ label: '锁定', command: 'lock' })
        }
        menuList.push({ label: '删除', command: 'remove' })
      }
      return menuList
    }, 
    
  }
}
</script>
<style lang="scss" scoped>
.drag-item {
  user-select: none;
  &.solid:hover {
    border-color: transparent !important;
    box-shadow: none !important;
  }
}
</style>
