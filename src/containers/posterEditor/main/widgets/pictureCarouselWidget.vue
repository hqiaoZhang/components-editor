/*
 * @Author: zhanghongqiao 
 * @Date: 2021-06-29 08:51:15 
 * @Email: 991034150@qq.com 
 * @Description: 走马灯
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-07 14:33:56
 */
 <template>
   <el-carousel height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
 </template>
 
<script>
import { mapState } from 'poster/poster.vuex'
import { CommonWidget } from 'poster/widgetConstructor'
import commonControl from 'poster/control/widgets/commonControl' 
export default { 
  data() {
    return {
      active: '',
    }
  },
  computed: {
    ...mapState(['canvasSize']),
  },
  mixins: [CommonWidget.widgetMixin()],
  components: {
    commonControl
  },
  created() {  
    if (!this.item.isCopied) {
      this.updateDragInfo({
        w: 400,
        h: 150,
        x: (this.canvasSize.width - 400) / 2,
        y: (this.canvasSize.height - 150) / 2,
      })
    }
  },
  methods: {
    handleItem(i) {
      this.active = i
    },
  }
}
</script>
 
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
 
