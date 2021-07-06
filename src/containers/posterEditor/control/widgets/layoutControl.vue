<template>
  <div class="layout-control">
    <el-collapse v-model="activeNames">
       <el-collapse-item name="position">
        <template #title>
          <div class="header">
            变换
          </div>
        </template>
        <position-control :drag-info="dragInfo" />
      </el-collapse-item>

      <el-collapse-item name="borderAndBackground">
        <template #title>
          <div class="header">样式</div>
        </template>
        <setting-content>
          <setting-item label="透明度"> 
            <el-slider v-model="inOpacity" style="width: 100%"></el-slider>
          </setting-item>

          <setting-item label="填充">
            <el-color-picker v-model="inBackgroundColor" size="mini" />
            <el-input v-model="inBackgroundColor" ></el-input> 
            <i class="iconfont fr">&#xe69b;</i>
          </setting-item>
          <setting-item label="边界">
            <el-color-picker v-model="inBorderColor" size="mini" />
            <el-input v-model="inBorderColor" ></el-input> 
            <i class="iconfont fr">&#xe69b;</i>
          </setting-item>
          <setting-item label=" ">
            <i class="iconfont" style="margin-left: 3px; font-size: 14px; width: 32px;">&#xe608;</i>
            <el-input v-model.number="inBorderWidth" style="width: 50%" type="number" />
            <el-select v-model="inBoxSizing" placeholder="请选择">
              <el-option
                v-for="item in boxSizingList"
                :key="item.value"
                :label="item.label"
                :value="item.value"> 
              </el-option>
            </el-select> 
          </setting-item> 

           <setting-item label=" ">
             <el-select v-model="inBorderStyle" placeholder="请选择">
              <el-option
                v-for="item in borderStyleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span :class="item.value"></span>
              </el-option>
            </el-select> 
           </setting-item>

           <setting-item label="阴影">
            <el-color-picker v-model="inBackgroundColor" size="mini" />
            <el-input v-model="inBackgroundColor" ></el-input> 
          </setting-item> 
        </setting-content>
      </el-collapse-item> 

      <el-collapse-item name="text">
        <template #title>
          <div class="header">
            文本
          </div>
        </template>
        
        <setting-content>
          <setting-item label=" ">
             <el-select v-model="infontFamily" placeholder="请选择">
              <el-option
                v-for="item in fontFamilyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"> 
              </el-option>
            </el-select> 
           </setting-item>

          <!-- fontFamilyList -->
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
            <!-- <el-radio-group v-model="inTextAlign" size="mini">
              <el-radio-button label="左对齐" />
              <el-radio-button label="居中" />
              <el-radio-button label="右对齐" />
            </el-radio-group> -->
          </setting-item>
          <setting-row>
            <template #left>
              <setting-item label="行间距">
                <input v-model.number="inLineHeight" type="number">
              </setting-item>
            </template>
            <template #right>
              <setting-item label="字间距">
                <input v-model.number="inLetterSpacing" type="number">
              </setting-item>
            </template>
          </setting-row>
          <setting-item label="格式">
            <radio-group v-model="inTextFormat" :list="textFotmatList">
              <!-- <template #bold>
                <i class="icon-align-left" />
              </template>
              <template #italic>
                <i class="icon-align-center" />
              </template> -->
            </radio-group>
            <!-- <el-radio-group v-model="inTextAlign" size="mini">
              <el-radio-button label="左对齐" />
              <el-radio-button label="居中" />
              <el-radio-button label="右对齐" />
            </el-radio-group> -->
          </setting-item>
        </setting-content>
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
      activeNames: ['text', 'position', 'borderAndBackground'],
      textAlignList: [
        { label: '左对齐', value: 'left' },
        { label: '居中', value: 'center' },
        { label: '右对齐', value: 'right' }
      ],
      textFotmatList: [
        { label: '粗体', value: 'bold' },
        { label: '斜体', value: 'italic' },
        { label: '划线', value: 'line-through' }
      ],
      borderStyleList: [
        { label: '实线', value: 'solid' },
        { label: '虚线', value: 'dashed' },
        { label: '双线', value: 'double ' },
        { label: '点线', value: 'dotted ' }
      ],
      boxSizingList: [
        { label: '内边框', value: 'border-box' },
        { label: '外边框', value: 'content-box' },
      ],
      fontFamilyList: [
        {label: '思源黑体', value: 'Noto Sans SC'},
        {label: '思源宋体', value: 'Noto Serif SC'},
        {label: '站酷庆科黄油体', value: 'ZCOOL QingKe HuangYou'},
        {label: '站酷小薇体', value: 'ZCOOL XiaoWei'},
      ],
      borderRadiusInit: {},
      inOpacity:  50,
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
    infontFamily: {
      get() {
        return this.style.fontFamily
      },
      set(val) {
        this.updateStyle('fontFamily', val)
      }
    },
    // inOpacity: {
    //   get() {
    //     return this.style.opacity
    //   },
    //   set(val) {
    //     this.updateStyle('opacity', val)
    //   }
    // },
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
    inPadding: {
      get() {
        return parseInt(this.style.padding)
      },
      set(val) {
        this.updateStyle('padding', val + 'px')
      }
    },
    
    inLineHeight: {
      get() {
        return parseInt(this.style.lineHeight)
      },
      set(val) {
        this.updateStyle('lineHeight', val + '%')
      }
    },
    inLetterSpacing: {
      get() {
        return parseInt(this.style.letterSpacing)
      },
      set(val) {
        this.updateStyle('letterSpacing', val + 'px')
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
    inBoxSizing: {
      get() {
        return this.style.boxSizing
      },
      set(val) {
        this.updateStyle('boxSizing', val)
      }
    },
    inTextFormat: {
      get() {
        const result = []
        if (this.style.fontWeight === 'bold') {
          result.push('bold')
        }
        if (this.style.fontStyle === 'italic') {
          result.push('italic')
        }
        if (this.style.textDecoration === 'line-through') {
          result.push('line-through')
        }
        return result
      },
      set(list) {
        const operation = list._operation
        const value = list._value
        const newValue = operation === 'add' ? value : ''
        if (value === 'bold') {
          this.updateStyle('fontWeight', newValue)
        } else if (value === 'italic') {
          this.updateStyle('fontStyle', newValue)
        } else if (value === 'line-through') {
          this.updateStyle('textDecoration', newValue)
        }
      }
    }
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
    padding: 0 16px;
    font-size: 12px;
    color: #999;
    /* border-style: dashed; */
  }  
   ::v-deep {
     .content .el-input__inner {
       height: 24px !important;
       line-height: 24px;
    }
  }
  i {
    font-size: 16px;
    color: #666;
  }
}
span.solid {
  display: inline-block;
  width: 100%;
  height: 0px;
  border-bottom: 1px solid rgb(204, 204, 204);
}
span.dashed {
  display: inline-block;
  width: 100%;
  height: 0px;
  border-bottom: 1px dashed rgb(204, 204, 204);
}
span.double {
  display: inline-block;
  width: 100%;
  height: 4px;
  border-top: 1px solid rgb(204, 204, 204);
  border-bottom: 1px solid rgb(204, 204, 204);
}
span.dotted {
  display: inline-block;
  width: 100%;
  height: 0px;
  border-bottom: 1px dotted rgb(204, 204, 204);
}
 ::v-deep {
  //  .el-collapse-item__header,
   .el-collapse-item__wrap {
      border-bottom: 2px solid $bodyBg; 
    }
    .el-collapse-item__header {
      height: 36px;
      line-height: 36px;
    }
    .el-collapse-item__content {
       padding-bottom: 0;
    }
    .el-color-picker--mini {
      height: 24px;
    }
    .el-color-picker__trigger {
      border: none;
      padding: 3px;
      width: 24px;
      height: 24px; 

    }
    .el-color-picker__color {
      border: 1px solid #eee;
      border-radius: 3px;
      overflow: hidden;
    }
 }

</style>
