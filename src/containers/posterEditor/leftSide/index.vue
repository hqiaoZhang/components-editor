<template>
  <div class="left_side">
    <div class="tabs">
      <span :class="{active:  activeName == 'components'}" @click="activeName = 'components'">组件</span>
      <span :class="{active:  activeName == 'layers'}" @click="activeName = 'layers'">图层</span>
       <i class="iconfont fr">&#xe6c1;</i>
    </div>

    <div class="layer_list" v-if="activeName == 'layers'">
      <layer-panel/>
    </div>
    <div class="component_list" v-if="activeName == 'components'">
      <ul class="widget_list" v-if="!current">
        <li v-for="item in widgets" :key="item.type" class="widget_item" @click="current = item"> 
          <i class="iconfont" v-html="item.icon" /> 
          {{item.name}}
        </li>
      </ul> 

       <div v-if="current" class="widget_container">
          <p class="back" @click="handleBack"><i class="iconfont">&#xe60a;</i> {{current.name}}</p>
          <div  v-for="item in componentsList" :key="item.type">
            <p class="name"><i class="iconfont" v-html="item.icon"></i>{{item.name}}</p>
            <component :is="'basics-widget'" :key="item.component" :components="item.children" :componentType="item.type" />
          </div>  
          </div>
    </div>
 
   
  </div>
</template>

<script>
import { mapActions } from "poster/poster.vuex";
import { BackgroundWidget } from "poster/widgetConstructor";
import imageWidget from "./widgets/imageWidget";
import layerPanel from 'poster/extendSideBar/layerPanel'
import backgroundWidget from "./widgets/backgroundWidget";
import textWidget from "./widgets/textWidget";
import rectWidget from "./widgets/rectWidget";
import layoutWidget from './widgets/layoutWidget'
import carouselWidget from './widgets/carouselWidget'
import basicsWidget from './widgets/basicsWidget'
import pilotlampWidget from './widgets/pilotlampWidget'
import commonWidget from './widgets/commonWidget'
import componentsList from './data'

export default {
 
  data() {
    return {
      activeName: 'components', 
      current: null,
      widgets: [
        {
          name: '基础组件',
          icon: '&#xe706;',
          type: 'basics'
        },{
          name: '工业组件',
          icon: '&#xe813;',
          type: 'Industry'
        },{
          name: '可视化组件',
          icon: '&#xe659;',
          type: 'visual'
        },{
          name: '自定义',
          icon: '&#xe693;',
          type: 'custom'
        }
      ]
    };
  },
  components: {
    layerPanel,
    basicsWidget,
    imageWidget,
    backgroundWidget,
    textWidget,
    rectWidget,
    layoutWidget,
    carouselWidget,
    pilotlampWidget,
    commonWidget
  },
  computed: {
    componentsList() {
      return componentsList[this.current.type]
    }
  },
  methods: {
    ...mapActions(["addBackground"]),
    init() {
      this.addBackground(
        new BackgroundWidget({
          backgroundColor: "#fff",
          isSolid: true,
          lock: true
        })
      );
    },
    handleBack() {
      this.current = null
    }
  },
  created() {
    this.current = this.widgets[0];
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.left_side{
  background-color: #fff;
  box-sizing: border-box;
  border-right: 2px solid $bodyBg;
  display: flex;
  width: 256px;
 
  flex-direction: column;
  .tabs {
    @include tabs; 
  }
  
  .widget_list{
    width: 100%;
    height: 100%; 
   
    i {
      font-size: 18px;
      vertical-align: middle;
      padding-right: 8px;
    } 
    .widget_item {
      line-height: 40px;
       padding: 0 16px;
       color: #000;
      &:hover {
        cursor: pointer;
        background: rgba(29, 132, 239, 0.1);
        color: $main_c1;
        i {
           color: $main_c1;
        }
      }
    }
  }
  .component_list,
  .layer_list {
    overflow: auto;
  }
  .widget_container {
    padding: 16px 0; 
    height: 100%; 
    .back {
      padding-left: 16px;
      cursor: pointer;
    }
    i {
      padding-right: 8px;
    }
    .name {
      padding: 16px;
      color: #333;
    }
  }
}
</style>
