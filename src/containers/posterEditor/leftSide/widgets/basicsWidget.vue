<template>
   <div class="add_widget">
      <div
      class="add_text" 
      v-for="(item, i) in components"
      :key="i"  @click="handleAdd(item)">
        <i class="iconfont" v-if="item.icon" v-html="item.icon"></i> 
        <img v-else :src="`static/images/components/${item.type}.png`" />
        {{item.name}}
      </div> 
    <input ref="input" type="file" style="display:none" @change="selectImg">
  </div>
</template>

<script>
import { mapActions } from 'poster/poster.vuex'
import { DrawRectWidget, CommonWidget, LayoutWidget } from 'poster/widgetConstructor'
import { validateImage } from '@/utils/imageHelpers'
import { uploadActivityImgAssets } from '@/api/activity'

export default { 
  data() {
    return {
      config: {}
    }
  },
  props: {
    components: Array,
    componentType: String
  },  
 
  methods: {
    ...mapActions(['addItem', 'addAssistWidget']),
    handleAdd(item) { 
      let config = {
        ...item,
        componentName: item.componentName || item.type + '-widget',
        // componentName: this.componentType + '-widget',
        typeLabel: item.name
      } 
      this.config = config
      if(this.componentType == 'layout') {
        return this.addItem(new LayoutWidget(item)) 
      }
      switch(item.type) { 
        case 'rect':
           this.addAssistWidget(new DrawRectWidget(config))
          break  
        case 'image':
          this.selectImgHandler()
          break   
        default: 
          this.addItem(new CommonWidget(config)) 
          break

      } 
    },
     selectImgHandler() {
      this.$refs.input.click()
    },
    async selectImg({ currentTarget: inputNode }) {
      try {
        const file = inputNode.files
        const imgFile = file && file[0]
        await validateImage(imgFile)
        const src = await uploadActivityImgAssets(imgFile)
        this.addImage({ src })
      } catch (e) {
        console.error(e)
      } finally {
        inputNode.value = ''
      }
    },
    addImage({ src }) {
      let config = {
        ...this.config,
        wState: {
          src
        }
      } 
      this.addItem(new CommonWidget(config))
    }
  }
}
</script>

<style lang="scss" scoped>
.add_widget {
  width: 100%;
  box-sizing: border-box; 
  .add_text {
    height: 40px;
    display: flex;
    align-items: center; 
    padding-left: 40px;
    color: #000;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;  
      background: #eeeeee;
      margin-right: 8px;
      image-rendering:-moz-crisp-edges;
    image-rendering:-o-crisp-edges;
    image-rendering:-webkit-optimize-contrast;
    image-rendering: crisp-edges;
    -ms-interpolation-mode:nearest-neighbor; 
    }
  }
  i {
   width: 24px;
    height: 24px;  
    background: #eeeeee;
    border-radius: 1px;
    color: $main_c1;
    font-size: 16px;
    line-height: 23px;
    text-align: center;
    display: inline-block;
    margin-right: 8px;
  }
}
</style>
