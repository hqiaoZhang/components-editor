<template>
   <div class="add-layout-widget">
      <el-button
      class="add-text"
      size="mini"
      v-for="(item, i) in components"
      :key="i"
      type="plain"  @click="handleAdd(item)">
        <el-tooltip :content="item.tips" placement="right" v-if="item.tips">
          <span>{{item.name}}</span>
        </el-tooltip>
        <span v-else>{{item.name}}</span>
      </el-button> 
  </div>
</template>

<script>
import { mapActions } from 'poster/poster.vuex'
import { LayoutWidget } from 'poster/widgetConstructor'
export default {
  props: {
    components: Array,
  }, 
  methods: {
    ...mapActions(['addItem']),
    handleAdd(item) { 
      this.addItem(new LayoutWidget(item))
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
