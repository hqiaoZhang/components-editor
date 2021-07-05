/*
 * @Author: zhanghongqiao 
 * @Date: 2021-07-01 16:37:09 
 * @Email: 991034150@qq.com 
 * @Description: 指示灯
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-02 13:44:14
 */

<template>
  <div class="pilotlamp-widget">
     <p :style="textStyle">
       <i class="iconfont" v-html="item.icon"  :style="textStyle"></i>
     </p>

    <portal v-if="isActive" :to="$data.$controlTarget">
      <pilotlamp-control :key="item.id" :item="item" />
    </portal>
  </div>
</template>

<script>
import pilotlampControl from 'poster/control/widgets/pilotlampControl'
import { PilotlampWidget } from 'poster/widgetConstructor'
// import { mapGetters, mapActions } from 'poster/poster.vuex'
export default {
  components: { pilotlampControl },
  mixins: [PilotlampWidget.widgetMixin()],
  data() {
    return {}
  },
  computed: {
    textStyle() {
      return this.wState.style
    }
  },
  mounted() {
    console.log(this)
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
 
</style>
