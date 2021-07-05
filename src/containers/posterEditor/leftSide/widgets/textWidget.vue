<template>
  <div class="add-text-widget">
    <ul>
      <li
        v-for="(item, index) in components"
        :key="index"
        class="presupposition-item"
        :style="item.style"
        @click="handleAddText(item)"
      >
        {{ `添加${item.text}` }}
      </li>
    </ul>
    <el-button
      class="add-text"
      size="mini"
      type="plain"
      @click="handleAddText(null)"
    >添加文本</el-button>
  </div>
</template>

<script>
import { mapActions } from 'poster/poster.vuex'
import { TextWidget } from 'poster/widgetConstructor'

export default {
  props: {
    components: Array,
  }, 
  methods: {
    ...mapActions(['addItem']),
    handleAddText(item) {
      if (item) {
        this.addItem(
          new TextWidget({
            wState: item
          })
        )
      } else {
        this.addItem(new TextWidget())
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.add-text-widget {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .presupposition-item {
    padding: 12px 0 !important;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: $colorTheme !important;
    }
  }
  .add-text {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
