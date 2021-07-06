<template>
  <setting-content>
     <el-row>
      <el-col :span="12"><span>X</span> <el-input v-model.number="dragInfo.x" type="number" /></el-col>
       <el-col :span="12"><span>Y</span><el-input v-model.number="dragInfo.y" type="number" /></el-col>
    </el-row>

    <el-row>
      <el-col :span="12"><span>W</span><el-input v-model.number="dragInfo.w" type="number" /></el-col>
       <el-col :span="12"><span>H</span><el-input v-model.number="dragInfo.h" type="number" /></el-col>
    </el-row>

     <el-row>
      <el-col :span="12">
        <span><i class="iconfont">&#xe7d1;</i> </span> 
        <el-input v-model.number="dragInfo.rotateZ" type="number" />
      </el-col>
       <el-col :span="12"></el-col>
    </el-row> 
  </setting-content>
</template>

<script>
import { settingContent, settingItem } from 'poster/commonUI'
export default {
  components: { settingContent, settingItem },
  props: {
    dragInfo: {
      type: Object,
      default() {
        return {}
      },
      require: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .el-col-12 {
    display: flex;
    padding-right: 16px;
    margin-bottom: 16px;
    span {
      padding-right: 8px;
      line-height: 32px;
      i {
        font-size: 14px;
      }
    }
  }
</style>
