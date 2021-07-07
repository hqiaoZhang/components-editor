<template>
   <div class="layout-widget" style="width:100%;height:100%">
     <template v-if="wState.type == 'grid-4'">
      <el-row>
        <el-col :class="{active: active == 1}" :span="12"  @click.native="handleItem(1)" :style="wState.style[0]"></el-col>
        <el-col :class="{active: active == 2}" :span="12" @click.native="handleItem(2)" :style="wState.style[1]"></el-col>
      </el-row>
        <el-row>
        <el-col :class="{active: active == 3}" :span="12" @click.native="handleItem(3)" :style="wState.style[2]"></el-col>
        <el-col :class="{active: active == 4}" :span="12" @click.native="handleItem(4)" :style="wState.style[3]"></el-col>
      </el-row>
     </template>

     <template v-if="wState.type == 'grid-9'">
      <el-row>
        <el-col :class="{active: active == 1}" :span="8" @click.native="handleItem(1)" :style="wState.style[0]"></el-col>
        <el-col :class="{active: active == 2}" :span="8" @click.native="handleItem(2)" :style="wState.style[1]"></el-col>
        <el-col :class="{active: active == 3}" :span="8" @click.native="handleItem(3)" :style="wState.style[2]"></el-col>
      </el-row>
      <el-row>
        <el-col :class="{active: active == 4}" :span="8" @click.native="handleItem(4)" :style="wState.style[3]"></el-col>
        <el-col :class="{active: active == 5}" :span="8" @click.native="handleItem(5)" :style="wState.style[4]"></el-col>
        <el-col :class="{active: active == 6}" :span="8" @click.native="handleItem(6)" :style="wState.style[5]"></el-col>
      </el-row>
      <el-row>
        <el-col :class="{active: active == 7}" :span="8" @click.native="handleItem(7)" :style="wState.style[6]"></el-col>
        <el-col :class="{active: active == 8}" :span="8" @click.native="handleItem(8)" :style="wState.style[7]"></el-col>
        <el-col :class="{active: active == 9}" :span="8" @click.native="handleItem(9)" :style="wState.style[8]"></el-col>
      </el-row>
     </template>

     <template v-if="wState.type == 'row-4'">
        <el-row :class="{active: i == active}" 
          v-for="i in 4" class="border" :key="i" @click.native="handleItem(i)" :style="wState.style[i -1]"></el-row> 
     </template>

     <template v-if="wState.type == 'col-4'">
        <el-row>
          <el-col :class="{active: i == active}"  
            v-for="i in 4" :key="i" @click.native="handleItem(i)" :style="wState.style[i - 1]"></el-col>
        </el-row>
     </template>

     <template v-if="wState.type == 'row-1' || wState.type == 'col-1'">
      <el-row>
         <el-col :class="wState.type" :style="wState.style[0]"></el-col>
      </el-row>
     </template>  

     <portal v-if="isActive" :to="$data.$controlTarget">
      <common-control :key="item.id" :item="item" />
    </portal>
     
   </div>
</template>

<script> 
import { mapMutations, mapState } from 'poster/poster.vuex'
import { LayoutWidget } from 'poster/widgetConstructor'
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
  mixins: [LayoutWidget.widgetMixin()],
  components: {
    commonControl
  },
  created() {  
    if (!this.item.isCopied) {
      let w = this.canvasSize.width
      let h = this.canvasSize.height
      let x = 0
      let y = 0
      if(this.wState.type == 'row-1') {
       
        y = (h - 1) / 2
        h = 1
      }else if(this.wState.type == 'col-1') {
        x = ( w - 1) / 2
        w = 1 
      }
      this.updateDragInfo({
        w: w,
        h: h,
        x: x,
        y: y
      })
    }
  },
  methods: {
     ...mapMutations(['SET_GRID_INDEX']),
    handleItem(i) {
      this.active = i
      this.SET_GRID_INDEX(i - 1)
    },
  }
}
</script>

<style lang="scss" scoped>
 .layout-widget {
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
  //  justify-content: space-around;
  //  align-items: center;
   .el-row {
     display: flex;
     flex: 1; 
     &.border {
       border: 1px dashed rgba(0,0,0,.5);
     }
   }
     .el-col {
        border: 1px dashed rgba(0,0,0,.5);
      &:last-child {
        // border-left: 0;
      }
      &.active {
        border:  1px dashed #1D84EF !important;
      }
      
      &.col-1 {
        border-left: 0;
        border-top: 0;
        border-bottom: 0;
      }
        &.row-1 {
          border-left: 0;
          border-right: 0;
          border-bottom: 0;
        }
    }
 
 }
 

</style>
