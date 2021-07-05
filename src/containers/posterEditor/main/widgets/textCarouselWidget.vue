/*
 * @Author: zhanghongqiao 
 * @Date: 2021-06-29 08:51:15 
 * @Email: 991034150@qq.com 
 * @Description: 文字轮播
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-01 10:28:10
 */
 <template>
   <ul class="line">
    <li style="margin-top: 0px; "><a title="getElementsByTagName的简写方式" href="#">getElementsByTagName的简写方式</a> 2010年06月24日 (1)</li>
    <li style="margin-top: 0px; "><a title="一个简单的鼠标划过切换效果" href="#">一个简单的鼠标划过切换效果</a> 2010年05月23日 (2)</li>
    <li style="margin-top: 0px; "><a title="奇或偶数行高亮显示及鼠标划过高亮显示类" href="#">奇或偶数行高亮显示及鼠标划过高亮显示类</a> 2010年05月05日 (3)</li>
    <li style="margin-top: 0px; "><a title="一个简单的纵横向动画效果类" href="#">一个简单的纵横向动画效果类</a> 2010年05月02日 (4)</li>
    <li style="margin-top: 0px; "><a title="document.getElementById的简写方式" href="#">document.getElementById的简写方式</a> 2010年04月18日 (5)</li>
    <li style="margin-top: 0px; "><a title="两种简单实现菜单高亮显示的JS类" href="#">两种简单实现菜单高亮显示的JS类</a> 2010年04月17日 (6)</li>
    <li style="margin-top: 0px; "><a title="简易的点击展开/关闭效果(原生JS版和JQ版)" href="#">简易的点击展开/关闭效果(原生JS版和JQ版)</a> 2010年08月02日 (7)</li>
  </ul>
 </template>
 
<script>
import { mapState } from 'poster/poster.vuex'
import { TextCarouselWidget } from 'poster/widgetConstructor'
import layoutControl from 'poster/control/widgets/layoutControl' 
export default { 
  data() {
    return {
      active: '',
    }
  },
  computed: {
    ...mapState(['canvasSize']),
  },
  mixins: [TextCarouselWidget.widgetMixin()],
  components: {
    layoutControl
  },
  created() {  
    if (!this.item.isCopied) {
      this.updateDragInfo({
        w: 500,
        h: 90,
        x: (this.canvasSize.width - 500) / 2,
        y: (this.canvasSize.height - 90) / 2,
      })
    }
  },
   mounted() {
    this.$nextTick(() => {
      $(function(){
	      $(".line").slideUp();	
      })
    })
  },
  methods: {
    handleItem(i) {
      this.active = i
    },
  }
}
</script>
 
<style lang="scss" scope>
   ul.line{
    width: 100%;
    height: 100%;
    background-color: #F8F8F8;
    overflow: hidden;
    margin-bottom: 20px;
    border: 2px solid #eee;
  } 
  ul.line li{height:30px;text-indent:15px; font-size:12px; line-height:30px;list-style:none} 
</style>
 
