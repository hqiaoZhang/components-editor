<template>
  <div class="straightline-widget"> 
    <div class="line_ins" :style="{
      borderBottom: `${style.borderWidth} ${style.borderStyle} ${style.borderColor}`
    }" :class="[style.type]">
      <span v-if="style.type == 'triangle_right'" :style="{borderColor:'transparent transparent transparent' + style.borderColor}"></span>
      <template v-else>
        <span></span>
        <span></span>
      </template>
    </div>
    <portal v-if="isActive" :to="$data.$controlTarget">
        <common-control :key="item.id" :item="item" />
      </portal>
  </div>
</template>

<script>
import commonControl from 'poster/control/widgets/commonControl'
import { StraightlineWidget } from 'poster/widgetConstructor'
import layoutControl from 'poster/control/widgets/layoutControl' 
// import { mapGetters, mapActions } from 'poster/poster.vuex'
export default { 
  mixins: [StraightlineWidget.widgetMixin()],
  data() {
    return {}
  },
  computed: {
    style() {
      console.log(this.wState.style)
      return this.wState.style
    }
  },
  components: {
    commonControl
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
 
.line_ins {
  transform: translateY(-50%);
  position: absolute;
  width: 100%;
  top: 50%;
}
.line_ins, .line_com {
  &.circle_right,
  &.circle {
    height: 5px;
    span,
    &::after,
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fc0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -1px;
    }
    span:last-child,
    &::before {
      left: initial;
      right: -1px;
    }
  }
  &.circle_right::after {
    display: none;
  }
  &.active div.mask{
    width: 100%;
    height: 28px;
    background: rgba(255, 204, 0, 0.2);
    position: absolute;
    top: -10px;
  }
}
.line_ins.circle,
.line_ins.circle_right {
  height: auto;
  &::after,&::before {
    display: none;
  } 
}
 
.triangle_right span{
  display:block;
  width:0;
  height:0;
  border-width:15px 0 15px 15px;
  border-style:solid;
  border-color:transparent transparent transparent #fc0;/*透明 透明 透明 黄*/
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
    right: -4px;
}
</style>
