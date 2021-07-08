<template>
  <div class="layout-control">
    <el-collapse v-model="activeNames" >
       <el-collapse-item name="position" v-if="item.type != 'background'">
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
            <el-slider show-input v-model="style.opacity" :max="1" :step="0.1" style="width: 100%"></el-slider>
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
            <el-color-picker v-model="inBoxshadow" size="mini" />
            <el-input v-model="inBoxshadow" ></el-input> 
          </setting-item> 

          <div class="border_radius">
            <div class="radius">
              <span :class="{active: activeRadius == 'all'}" @click="handleRadius('all')"></span>
              <i class="iconfont" :class="{active: activeRadius == 'mult'}" @click="handleRadius('mult')">&#xe639;</i>
            </div>
            <div class="content inputs">
              <el-input v-model="inBorderTopLeftRadius"></el-input> 
              <template v-if="activeRadius == 'mult'">
                <el-input v-model="inBorderTopRightRadius" type="number"></el-input>
                <el-input v-model="inBorderBottomLeftRadius" type="number"></el-input>
                <el-input v-model="inBorderBottomRightRadius" type="number"></el-input>
              </template>
            </div>
          </div>  
        </setting-content>
      </el-collapse-item> 

      <el-collapse-item name="text" v-if="item.type == 'text'">
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
                <i class="iconfont" title="行间距">&#xe6f4;</i>
                <input v-model.number="inLineHeight" type="number">
            </el-col>
            <el-col :span="8"> 
                <i title="字符间距" class="iconfont">&#xe6fb;</i> 
                <input v-model.number="inLetterSpacing" type="number">
            </el-col>
            <el-col :span="8">
                <i title="段落间距" class="iconfont">&#xe7c4;</i>
                <input v-model.number="inLetterSpacing" type="number">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <radio-group v-model="inTextAlign" :list="textAlignList">
                <template #left>
                  <i class="iconfont" v-html="'&#xe6fc;'" />
                </template>
                <template #center>
                  <i class="iconfont" v-html="'&#xe6f0;'" />
                </template>
                <template #right>
                  <i class="iconfont" v-html="'&#xe6fa;'" />
                </template>
              </radio-group> 
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
              <i title="大写" class="iconfont">&#xe6ee;</i> 
              <i title="小写" class="iconfont">&#xe6f7;</i> 
              <i title="词首大写" class="iconfont">&#xe6ed;</i> 
              <i title="上标" class="iconfont">&#xe6f3;</i>
              <i title="下标" class="iconfont">&#xe6f6;</i>
              <i title="下划线" class="iconfont">&#xe6f9;</i>
              <i title="删除线" class="iconfont">&#xe6f8;</i> 
            </el-col>
          </el-row>  
        </setting-content>
      </el-collapse-item> 
       <el-collapse-item name="background">
        <template #title>
          <div class="header">背景</div>
        </template>
        <setting-content class="background_fill">  
          <div class="img" v-for="i in 9" :key="i">
            <img src="static/images/background/1.jpg" />
          </div>
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
      activeRadius: 'all',
    }
  },
  mounted() {
    console.log(this.item)
  },
 
  computed: {
    ...mapState(['gridIndex']),
    // 边框颜色或文字边框
    
    inBorderColor: {
      get() {
        return this.style.borderColor
      },
      set(val) {
        this.updateStyle('borderColor', val, this.sindex)
      }
    },
    inBorderWidth: {
      get() {
        return parseInt(this.style.borderWidth)
      },
      set(val) {
        this.updateStyle('borderWidth', val + 'px', this.sindex)
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
    // 背景颜色，或文字颜色
    inBackgroundColor: {
      get() {
        if(this.item.type == 'text') {
          return this.style.color
        }
        return this.style.backgroundColor
      },
      set(val) { 
        if(this.item.type == 'text') {
          return this.updateStyle('color', val)
        }
        this.updateStyle('backgroundColor', val, this.sindex)
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
    inBoxshadowColor: {
       get() {
        return this.style.boxShadowColor
      },
      set(val) {
        this.updateStyle('boxShadow', `1px 1px 5px ${val}`)
      }
    },
    inBoxshadow: { 
      get() {
        return this.style.boxShadowColor
      },
      set(val) {
        // console.log('====', val)
        this.updateStyle('boxShadow', `1px 1px 5px ${val}`)
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
    },
    inBorderTopLeftRadius: {
      get() {
        return parseInt(this.style.borderTopLeftRadius)
      },
      set(val) {
        // 如果是全部同时设置4个角
        if(this.activeRadius == 'all') {
          this.updateStyle('borderTopLeftRadius', val + '%', false)
          this.updateStyle('borderTopRightRadius', val + '%', false)
          this.updateStyle('borderBottomLeftRadius', val + '%', false)
          this.updateStyle('borderBottomRightRadius', val + '%', false)
        }else {
          this.updateStyle('borderTopLeftRadius', val + '%', false /** no pushHistory */)
        }
        
      }
    },
    inBorderTopRightRadius: {
      get() {
        return parseInt(this.style.borderTopRightRadius)
      },
      set(val) {
        this.updateStyle(
          'borderTopRightRadius',
          val + '%',
          false /** no pushHistory */
        )
      }
    },
    inBorderBottomLeftRadius: {
      get() {
        return parseInt(this.style.borderBottomLeftRadius)
      },
      set(val) {
        this.updateStyle(
          'borderBottomLeftRadius',
          val + '%',
          false /** no pushHistory */
        )
      }
    },
    inBorderBottomRightRadius: {
      get() {
        return parseInt(this.style.borderBottomRightRadius)
      },
      set(val) {
        this.updateStyle(
          'borderBottomRightRadius',
          val + '%',
          false /** no pushHistory */
        )
      }
    }
  },
  methods: {
    handleRadius(type) {
      this.activeRadius = type
      console.log('type', type)
    }
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
    overflow: hidden;
    border: 1px solid transparent;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:hover {
      border: 1px solid #1D84EF;
    }
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
      transition: all 0.2s;
      // image-rendering:-moz-crisp-edges;
      // image-rendering:-o-crisp-edges;
      // image-rendering:-webkit-optimize-contrast;
      // image-rendering: crisp-edges;
      // -ms-interpolation-mode:nearest-neighbor; 
      &:hover {
        
        transform: scale(1.2);
      }
    }
  }
  .border_radius {
     margin-bottom: 8px;
     display: flex;
    .radius {
      border: 1px solid #ddd;
      width: 48px;
      height: 24px;
      border-radius: 2px; 
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size: 14px;
        cursor: pointer;
        color: #999;
      }
      span.active {
        border: 1px solid #1D84EF; 
      }
      i.active {
        color: #1D84EF;
      }
    }
    .inputs {
      flex: 1; 
      display: flex; 
      .el-input {
        margin-left: 8px; 
      }  
      ::v-deep {
        input { 
          border-color: transparent; 
        }
        input:focus {
          border-color: $colorTheme;
        }
      }
    }
    span {
      width: 14px;
      height: 14px;
      border: 1px solid #999;
      border-radius: 4px;
      cursor: pointer;
      display: block;
      &:last-child {
        border-style: dashed;
      }
      &.active,
      &:hover {
        border-color: #1D84EF;
      } 
    } 
  }
  .font_spacing i {
    margin-right: 12px;
  }
   ::v-deep {
     .content .el-input__inner {
       height: 24px !important;
       line-height: 24px;
       color: #000;
    }
    .el-slider__runway.show-input {
      margin-right: 32px;
    }
    .el-slider__input {
      width: 35px;
      .el-input-number__decrease,
      .el-input-number__increase  {
        display: none;
      }
      .el-input__inner {
        width: 35px;
      }
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
