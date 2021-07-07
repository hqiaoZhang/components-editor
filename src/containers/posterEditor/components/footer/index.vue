<template>
  <div class="footer">
    <span>ctrl+S 保存</span>
    <span><i class="iconfont">&#xe64c;</i>快捷键</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 18px;
  background: #eee;
  position: absolute;
  bottom: -9px;
  left: 3px;
  line-height: 18px;
  padding-left: 10px;
  span {
    padding-right: 90px;
    transform: scale(0.85);
    display: inline-block; 
  }
}
</style>
