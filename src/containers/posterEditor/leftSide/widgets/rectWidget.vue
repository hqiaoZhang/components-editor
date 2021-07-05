<template>
  <div class="add-rect-widget">
    <el-button
      class="add-text"
      size="mini"
      type="plain"
      @click="handleAddRect"
    >添加矩形</el-button>
  </div>
</template>

<script>
import { mapActions } from 'poster/poster.vuex'
import { DrawRectWidget } from 'poster/widgetConstructor'
export default {
  data() {
    return {
      recommendList: []
    }
  },
  methods: {
    ...mapActions(['addAssistWidget']),
    handleAddRect() {
      this.addAssistWidget(new DrawRectWidget())
    }
  }
}
</script>
<style lang="scss" scoped>
.add-rect-widget {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .add-text {
    width: 100%;
  }
}
</style>
