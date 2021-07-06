<template functional>
  <div class="setting-item">
    <div class="label">{{ props.label }}</div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.setting-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  .label {
    min-width: 24px;
    margin-right: 14px;
    line-height: 24px;
  }
  .content {
    display: flex;
    align-items: center;  
    flex: 1;
    ::v-deep {
      .el-color-picker__icon.el-icon-arrow-down {
        display: none;
      }
      .el-select input {
        margin: 0;
        width: 82px;
      }
      input {
        width: 60px;
        height: 32px;
        // border: 1px solid #ccd5db;
        border-color: transparent;
        box-sizing: border-box;
        padding: 0 4px; 
        font-size: 12px;
        margin-left: 10px;
      }
      input:focus {
        border-color: $colorTheme;
      }
    }
  }
}
</style>
