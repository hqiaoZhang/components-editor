<template>
  <div class="poster_editor_control poster-editor_deactivated-ignore">
    <div class="tabs">
      <i class="iconfont">&#xe6c1;</i>
      <span class="active">样式</span>
      <span>事件</span>
      <span>数据源</span>
    </div>
    <div class="alignment">
       <!-- 多组件对齐编辑 -->
       <widget-composition-control />
    </div>
    <portal-target name="widgetControl" class="control_target" />
   
  </div>
</template>

<script>
import widgetCompositionControl from './widgets/widgetCompositionControl'
export default {
  components: { widgetCompositionControl },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.poster_editor_control {
  .tabs,
  .alignment {
    @include tabs;
    display: flex;
    justify-content: space-between;
    i {
      margin-right: 20px;
    }
  }
  width: 288px;
  height: 100%;
  background: #fff;
  position: relative;
  .control_target {
    width: 100%;
    height: 84%;
    overflow-y: scroll;
  }
}
</style>
