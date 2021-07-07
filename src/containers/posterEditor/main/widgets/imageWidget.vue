<template>
  <div class="image-widget" style="width:100%;height:100%">
    <img
      ref="image"
      :src="wState.src"
      class="qr-code"
      :style="wState.style"
      ondragstart="return false"
      @load="load"
    >
    <portal v-if="isActive" :to="$data.$controlTarget">
      <common-control :key="item.id" :item="item" />
    </portal>
  </div>
</template>

<script>
import commonControl from 'poster/control/widgets/commonControl'
 
import { CommonWidget } from 'poster/widgetConstructor'
// import { mapGetters, mapActions } from 'poster/poster.vuex'
export default {
  components: { commonControl },
  mixins: [CommonWidget.widgetMixin()],
  data() {
    return {}
  }, 
  methods: {
    load() {
      if (!this.item.isCopied) {
        const imgRef = this.$refs.image
        const width = imgRef.naturalWidth
        const height = imgRef.naturalHeight
        this.updateDragInfo({ w: 100, h: parseInt((100 * height) / width) })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.drag-item {
  user-select: none;
  img {
    width:100%;
    height:100%
  }
}
</style>
