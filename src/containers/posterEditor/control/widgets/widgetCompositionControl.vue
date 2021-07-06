<template>
 <!-- v-if="activeItems.length > 1"  -->
  <div class="widget-composition-control">
    <el-row>
      <el-col :span="10">
         <radio-group
          :list="alignList"
          @change="changeCompositionPosition($event)"
        />
      </el-col>
      <el-col :span="10" class="fr">
         <radio-group
          :list="alignList"
          @change="changeCompositionPosition($event)"
        />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapActions, mapState } from 'poster/poster.vuex'
import { settingContent, settingItem, radioGroup } from 'poster/commonUI'

export default {
  components: { settingContent, settingItem, radioGroup },
  data() {
    return {
      alignList: [
        { label: '左对齐', value: 'alignLeft', icon: '&#xe6eb;' },
        { label: '水平居中对齐', value: 'alignCenter',  icon: '&#xe6ea;' },
        { label: '右对齐', value: 'alignRight',  icon: '&#xe6e9;' }
      ]
    }
  },
  computed: {
    ...mapState(['activeItems'])
  },
  methods: {
    ...mapActions(['changeCompositionPosition'])
  }
}
</script>

<style lang="scss" scoped>
.widget-composition-control {
  width: 100%;
  height: 100%;
  
}
</style>
