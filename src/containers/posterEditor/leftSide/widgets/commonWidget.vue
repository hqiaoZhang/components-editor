<template>
   <div class="add-layout-widget">
      <el-button
      class="add-text"
      size="mini"
      v-for="(item, i) in components"
      :key="i"
      type="plain"  @click="handleAdd(item)">
        {{item.name}}
      </el-button> 
    <input ref="input" type="file" style="display:none" @change="selectImg">
  </div>
</template>

<script>
import { mapActions } from 'poster/poster.vuex'
import { DrawRectWidget, ImageWidget, CommonWidget } from 'poster/widgetConstructor'
import { validateImage } from '@/utils/imageHelpers'
import { uploadActivityImgAssets } from '@/api/activity'

export default { 
  props: {
    components: Array,
  },  
 
  methods: {
    ...mapActions(['addItem', 'addAssistWidget']),
    handleAdd(item) { 
      let config = {
        ...item,
        componentName: item.componentName ||  item.type + '-widget',
        typeLabel: item.name
      }
      switch(item.type) { 
        case 'rect':
           this.addAssistWidget(new DrawRectWidget())
          break  
        case 'img':
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
      this.addItem(new ImageWidget({ wState: { src }}))
    }
  }
}
</script>

<style lang="scss" scoped>
.add-layout-widget {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .add-text {
    width: 100%;
    margin: 0 0 10px 0;
  }
}
</style>
