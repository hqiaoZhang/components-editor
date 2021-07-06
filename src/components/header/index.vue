<template>
  <div  class="header">
    <div class="library_list">
      <i class="iconfont">&#xe60a;</i>
      <span>组件库</span>
      <span>素材库</span>
    </div>
    <div class="project_name">大屏设计</div>
    <div class="opt_btns">
       <i class="iconfont" @click="savePage">&#xe6f1;</i>
       <i class="iconfont">&#xe61e;</i>
       <i>100%</i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'poster/poster.vuex'
export default {
  data() {
    return {
      savePageLoading: false
    }
  },
  computed: {
    ...mapState(['isUnsavedState', 'posterItems'])
  },
  methods: {
    ...mapActions(['saveActivityPageConfig']),
    closeEditor() {
      this.$router.back()
    },
    savePage() {
      if (this.savePageLoading) return
      if (this.posterItems.length === 0) {
        this.$message.error('当前画布中未添加任何元素，请添加后再提交')
        return
      }
      this.savePageLoading = true
         sessionStorage.setItem('posterItems', JSON.stringify(this.posterItems))
      this.saveActivityPageConfig().finally(() => {
        this.savePageLoading = false
      })
    }
  }
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
        cursor: pointer;
        &:last-child {
          color: #999;
          font-size: 14px;
        }
      }
    }
  }
</style>
 
