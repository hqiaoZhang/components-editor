<template>
  <div class="layout-control">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="borderAndBackground">
        <template #title>
          <div class="header">边框和背景</div>
        </template>
        <setting-content>
          <setting-item label="背景颜色">
            <el-color-picker v-model="inBackgroundColor" size="small" />
          </setting-item>
          <setting-item label="边框颜色、宽度">
            <el-color-picker v-model="inBorderColor" size="small" />
            <input v-model.number="inBorderWidth" type="number">
          </setting-item>
          <setting-item label="边框样式">
            <radio-group v-model="inBorderStyle" :list="borderStyleList" />
          </setting-item> 
        </setting-content>
      </el-collapse-item>
      <el-collapse-item name="position">
        <template #title>
          <div class="header">
            位置
          </div>
        </template>
        <position-control :drag-info="dragInfo" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
 
<script>
import { commonMixin } from './common/mixins'
import { mapState } from 'poster/poster.vuex'
export default {
  mixins: [commonMixin],
  data() {
    return {
      activeNames: ['position', 'borderAndBackground'],
      borderStyleList: [
        { label: '实线', value: 'solid' },
        { label: '虚线', value: 'dashed' },
        { label: '双线', value: 'double ' },
        { label: '点线', value: 'dotted ' }
      ],
      borderRadiusInit: {}
    }
  },
  mounted() {
    console.log(this)
  },
  computed: {
    ...mapState(['gridIndex']),
    inBorderColor: {
      get() {
        return this.style[this.gridIndex].borderColor
      },
      set(val) {
        this.updateStyle('borderColor', val, this.gridIndex)
      }
    },
    inBorderWidth: {
      get() {
        return parseInt(this.style[this.gridIndex].borderWidth)
      },
      set(val) {
        this.updateStyle('borderWidth', val + 'px', this.gridIndex)
      }
    },
    inBorderStyle: {
      get() {
        return this.style[this.gridIndex].borderStyle
      },
      set(val) {
        this.updateStyle('borderStyle', val, this.gridIndex)
      }
    },
    inBackgroundColor: {
      get() {
        return this.style[this.gridIndex].backgroundColor
      },
      set(val) { 
        this.updateStyle('backgroundColor', val, this.gridIndex)
      }
    },
  },
  methods: {
     
  }
}
</script>
<style lang="scss" scoped>
.layout-control {
  width: 100%;
  .header {
    box-sizing: border-box;
    padding: 0 20px;
    /* border-style: dashed; */
  }
}
</style>
