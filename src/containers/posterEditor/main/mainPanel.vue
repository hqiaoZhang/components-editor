<template>
  <div
    class="main-panel"
    :style="{
      width: canvasSize.width + 'px',
      height: canvasSize.height + 'px'
    }"
    @mousedown.prevent.stop=""
  >
    <background-widget
      v-if="background"
      :key="background.id"
      :item="background"
      v-on="$listeners"
    />
    <!-- 组件容器 -->
    <widget-container
      v-for="item in posterItems"
      v-show="item.visible"
      :key="item.id"
      :item="item"
      v-on="$listeners"
    />
    <!-- 辅助组件 -->
    <component
      :is="item.componentName"
      v-for="item in assistWidgets"
      v-show="item.visible"
      :key="item.id"
      :item="item"
    /> 
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from '../poster.vuex'
import widgetContainer from './widgets/widgetContainer' 
import drawRectWidget from './assistWidgets/drawRectWidget'
import layoutWidget from './widgets/layoutWidget' 
import pictureCarouselWidget from './widgets/pictureCarouselWidget'
import textCarouselWidget from './widgets/textCarouselWidget'
import pilotlampWidget from './widgets/pilotlampWidget'
import tableWidget from './widgets/tableWidget'
import straightlineWidget from './widgets/straightlineWidget' 
 import backgroundWidget from './widgets/backgroundWidget'
 import { BackgroundWidget, CommonWidget } from 'poster/widgetConstructor'
export default {
  components: {
    backgroundWidget,
    widgetContainer, 
    drawRectWidget,
    layoutWidget, 
    pictureCarouselWidget,
    textCarouselWidget,
    pilotlampWidget,
    tableWidget,
    straightlineWidget, 
  },
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'posterItems',
      'canvasSize',
      'background',
      'assistWidgets',
      'pageTitle'
    ]) 
  },
  mounted() {
    this.initBackgroundColor()
  },
  methods: {
    ...mapActions(['addBackground', 'addItem']),
    // 初始化背景
    initBackgroundColor() {
      let commonConfig = new CommonWidget() 
      this.addBackground(
        new BackgroundWidget({
          lock: true,
          wState: { 
            isSolid: true, 
            style: {
              ...commonConfig.wState.style, 
              backgroundColor: sessionStorage.getItem('bodyBackground')
            }
          }
        })
      )
    },
  }
}
</script>
<style lang="scss" scoped>
.main-panel {
  background-color: #fff;
  /* position: absolute; */
  /* left: 50%; */
  margin: 0 auto;
  position: relative;
  user-select: none;
  box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.1);
  transition-property: height;
  transition: 0.4s;
  cursor: initial;
  .poster-item-container {
    /* position: absolute;
    top: 0; */
  }
  .custom-contextmenu {
    z-index: 999;
  }
}
</style>
