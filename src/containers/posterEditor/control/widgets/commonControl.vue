<template>
  <div class="layout-control">
    <el-collapse v-model="activeNames">
       <el-collapse-item name="position">
        <template #title>
          <div class="header">变换</div>
        </template>
        <position-control :drag-info="dragInfo" />
      </el-collapse-item>

      <el-collapse-item name="style">
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
          <div class="header">文本</div>
        </template>
        <setting-content class="text_content">
          <el-row>
            <el-select v-model="infontFamily" placeholder="请选择">
              <el-option
                v-for="item in fontFamilyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"> 
              </el-option>
            </el-select> 
          </el-row> 

          <el-row>
            <el-col :span="6">
              <el-input v-model="inFontSize">12</el-input>
            </el-col>
            <el-col :span="6">&nbsp;</el-col>
            <el-col :span="12">
              <el-select v-model="inFontWeight" placeholder="请选择">
                <el-option
                  v-for="item in fontWeightList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"> 
                </el-option>
              </el-select> 
            </el-col>
          </el-row>
          <el-row class="font_spacing">
            <el-col :span="8">
                <el-tooltip content="行间距" placement="top">
                  <i class="iconfont">&#xe6f4;</i>
                </el-tooltip>
                <input v-model.number="inLineHeight" type="number">
            </el-col>
            <el-col :span="8">
               <el-tooltip content="字符间距" placement="top">
                  <i class="iconfont">&#xe6fb;</i>
                </el-tooltip> 
                <input v-model.number="inLetterSpacing" type="number">
            </el-col>
            <el-col :span="8">
              <el-tooltip content="段落间距" placement="top">
                   <i class="iconfont">&#xe7c4;</i>
              </el-tooltip>  
                <input v-model.number="inLetterSpacing" type="number">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <i class="iconfont" v-html="'&#xe6fc;'" />
              <i class="iconfont" v-html="'&#xe6f0;'" />
              <i class="iconfont" v-html="'&#xe6fa;'" />
            </el-col>
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="10"> 
              <i class="iconfont" v-html="'&#xe6ef;'" />
              <i class="iconfont" v-html="'&#xe6f5;'" />
              <i class="iconfont" v-html="'&#xe6fd;'" />
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-tooltip content="大写" placement="top">
                <i class="iconfont">&#xe6ee;</i>
              </el-tooltip>

              <el-tooltip content="小写" placement="top">
                <i class="iconfont">&#xe6f7;</i>
              </el-tooltip>

              <el-tooltip content="词首大写" placement="top">
                <i class="iconfont">&#xe6ed;</i>
              </el-tooltip>

              <el-tooltip content="上标" placement="top">
                <i class="iconfont">&#xe6f3;</i>
              </el-tooltip>

               <el-tooltip content="下标" placement="top">
                <i class="iconfont">&#xe6f6;</i>
              </el-tooltip>

               <el-tooltip content="下划线" placement="top">
                <i class="iconfont">&#xe6f9;</i>
              </el-tooltip>

              <el-tooltip content="删除线" placement="top">
                <i class="iconfont">&#xe6f8;</i>
              </el-tooltip> 
            </el-col>
          </el-row>  
        </setting-content>
      </el-collapse-item> 
       <el-collapse-item name="background">
        <template #title>
          <div class="header">背景</div>
        </template>
        <setting-content class="background_fill">  
          <div class="img" v-for="i in 9" :key="i"></div>
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
      activeNames: ['text', 'position', 'style', 'background'],
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
      fontWeightList: [
        {label: '粗体', value: 'bold'},
        {label: '正常', value: 'normal'},
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
        return this.style.borderColor
      },
      set(val) {
        this.updateStyle('borderColor', val)
      }
    },
    inBorderWidth: {
      get() {
        return parseInt(this.style.borderWidth)
      },
      set(val) {
        this.updateStyle('borderWidth', val + 'px')
      }
    },
    inBorderStyle: {
      get() {
        return this.style.borderStyle
      },
      set(val) {
        this.updateStyle('borderStyle', val)
      }
    },
    inBackgroundColor: {
      get() {
        return this.style.backgroundColor
      },
      set(val) { 
        this.updateStyle('backgroundColor', val)
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
    inFontWeight: {
      get() {
        return this.style.fontWeight
      },
      set(val) {
        this.updateStyle('fontWeight', val)
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
  .background_fill {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .background_fill .img {
    width: 78px;
    height: 45px;
    margin-right: 8px;
    background: #eee;
    margin-bottom: 8px;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  .font_spacing i {
    margin-right: 12px;
  }
   ::v-deep {
     .content .el-input__inner {
       height: 24px !important;
       line-height: 24px;
    }
    .text_content {
      .el-select {
        width: 100%;
      }
      input { 
        border-color: transparent;
        padding: 0 4px; 
        margin-left: -4px;
        font-size: 14px;
        color: #999;
      }
       input:focus {
        border-color: $colorTheme;
      }
      .el-col{
        display: flex;
        justify-content: space-between;
      }
      .el-row {
        margin-bottom: 10px;
      }
      .el-col-8 {
        width: 33.33333%;
      }
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
