<template>
   <div class="add-pilotlamp-widget">
      <p v-for="(item, i) in list" :key="i" class="add-text" @click="handleAdd(item)"><i class="iconfont" v-html="item.icon" /> {{item.name}} </p>
  </div>
</template>

<script>
import { mapActions } from 'poster/poster.vuex'
import { PilotlampWidget } from 'poster/widgetConstructor'
export default {
  data() {
    return {
      list: [{
        name: '交通信号灯-红', 
        icon: '&#xe630;',
      },{
        name: '交通信号灯-黄', 
        icon: '&#xe62f;',
      },{
        name: '交通信号灯-绿', 
        icon: '&#xe62e;',
      },{
        name: '告警-红', 
        icon: '&#xf190;',
      },{
       name: '告警-黄', 
        icon: '&#xe607;',
      }]
    }
  },
  methods: {
    ...mapActions(['addItem']),
    handleAdd(item) { 
      this.addItem(new PilotlampWidget(item))
    }
  }
}
</script>

<style lang="scss" scoped>
.add-pilotlamp-widget {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .add-text {
    width: 100%;
    margin: 0 0 10px 0;
    background: rgba(64, 160, 255, 0.06);
    border: 1px solid rgba(64, 160, 255, 0.1);
    padding: 10px;
    cursor: pointer;
    i {
      font-size: 16px;
    }
  }
}
</style>
