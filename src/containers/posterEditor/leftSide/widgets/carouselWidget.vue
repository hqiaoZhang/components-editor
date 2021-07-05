/*
 * @Author: zhanghongqiao 
 * @Date: 2021-07-01 09:12:35 
 * @Email: 991034150@qq.com 
 * @Description: 轮播
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-05 13:35:30
 */

 <template>
   <div class="add-carousel-widget">
      <el-button
      class="add-text"
      size="mini"  
      type="plain"  @click="handleAdd(item.type)" v-for="(item, i) in components" :key="i">
        {{item.name}}
      </el-button>  
  </div>
</template>

<script>
import { mapActions } from 'poster/poster.vuex'
import { PictureCarouselWidget, TextCarouselWidget } from 'poster/widgetConstructor'
export default {
  props: {
    components: Array,
  }, 
  methods: {
    ...mapActions(['addItem']),
    handleAdd(type) {
      if(type == 'picture-carousel') {
        return this.addItem(new PictureCarouselWidget())
      } 
      this.addItem(new TextCarouselWidget())
    }
  }
}
</script>


<style lang="scss" scoped>
.add-carousel-widget {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .add-text {
    width: 100%;
    margin: 0 0 10px 0;
  }
}
</style>
