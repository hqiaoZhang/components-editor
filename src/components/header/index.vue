<template>
  <div  class="header">
    <div class="library_list">
      <i class="iconfont">&#xe60a;</i>
      <span>组件库</span>
      <span>素材库</span>
    </div>
    <div class="project_name">大屏设计</div>
    <div class="opt_btns">
       <i class="iconfont">&#xe6f1;</i>
       <i class="iconfont">&#xe61e;</i>
       <i>100%</i>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 50px;
    background: #fff;
    margin-bottom: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 0 16px;
    .library_list {
      span  {
        padding-left: 22px;
      }
      i {
        cursor: pointer;
      }
    } 
    .project_name {
      color: #000;
    }
    .opt_btns {
      i {
        font-size: 18px;
        color: #666;
        margin-right: 18px;
        font-style: normal;
        &:last-child {
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
</style>
 
