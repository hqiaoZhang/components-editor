<template>
  <div class="text-control">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="text">
        <template #title>
          <div class="header">
            指示灯
          </div>
        </template>
        <setting-content>
          <setting-row>
            <template #left>
              <setting-item label="颜色">
                <el-color-picker v-model="inColor" size="small" />
              </setting-item>
            </template>
            <template #right>
              <setting-item label="字号">
                <input v-model.number="inFontSize" type="number">
              </setting-item>
            </template>
          </setting-row>
          <setting-item label="对齐方式">
            <radio-group v-model="inTextAlign" :list="textAlignList">
              <template #left>
                <i class="iconfont" v-html="'&#xe723;'" />
              </template>
              <template #center>
                <i class="iconfont" v-html="'&#xe602;'" />
              </template>
              <template #right>
                <i class="iconfont" v-html="'&#xe663;'" />
              </template>
            </radio-group> 
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
export default {
  mixins: [commonMixin],
  data() {
    return {
      activeNames: ['text', 'position', 'borderAndBackground'],
      textAlignList: [
        { label: '左对齐', value: 'left' },
        { label: '居中', value: 'center' },
        { label: '右对齐', value: 'right' }
      ],
     
    }
  },
  computed: {
    inColor: {
      get() {
        return this.style.color
      },
      set(val) {
        this.updateStyle('color', val)
      }
    },
    inFontSize: {
      get() {
        return parseInt(this.style.fontSize)
      },
      set(val) {
        this.updateStyle('fontSize', val + 'px')
      }
    }, 
    inTextAlign: {
      get() {
        return this.style.textAlign
      },
      set(val) {
        this.updateStyle('textAlign', val)
      }
    },
 
  
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.text-control {
  width: 100%;
  .header {
    box-sizing: border-box;
    padding: 0 20px;
    /* border-style: dashed; */
  }
}
</style>
