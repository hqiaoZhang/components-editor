/*
 * @Author: zhanghongqiao 
 * @Date: 2021-07-02 15:21:29 
 * @Email: 991034150@qq.com 
 * @Description: Description
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-02 15:31:16
 */

<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </template>

<script>
import { mapState, mapActions } from 'poster/poster.vuex'
import { TableWidget } from 'poster/widgetConstructor'
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mixins: [TableWidget.widgetMixin()],
  computed: {
    ...mapState(['canvasSize']), 
  },
  created() {
    if (!this.item.isCopied) {
      this.updateDragInfo({
        w: this.canvasSize.width,
        h: this.canvasSize.height / 2,
        x: 0,
        y: 0
      })
    }
  },
}
</script>