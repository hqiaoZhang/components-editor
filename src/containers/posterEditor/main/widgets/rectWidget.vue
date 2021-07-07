<template>
  <div class="rect-widget" :style="rectStyleFilter">
    <!-- {{ isActive }} -->
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
  computed: {
    rectStyleFilter() {
      return this.wState.style
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.drag-item {
  user-select: none;
  .rect-widget {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}
</style>
