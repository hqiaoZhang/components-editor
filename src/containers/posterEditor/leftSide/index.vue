<template>
  <div class="left-side">
    <ul class="widget-list">
      <li v-for="item in widgets" :key="item.type" @click="current = item">
        <el-tooltip
          class="widget-item"
          :class="{ active: current.type === item.type }"
          effect="dark"
          :content="item.name"
          placement="right"
          transition="el-zoom-in-center"
        >
          <i class="iconfont" v-html="item.icon" />
        </el-tooltip>
      </li>
    </ul>
    <div v-if="current" class="widget-container">
      <component :is="current.component" :key="current.component" :components="current.children" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "poster/poster.vuex";
import { BackgroundWidget } from "poster/widgetConstructor";
import imageWidget from "./widgets/imageWidget";
import backgroundWidget from "./widgets/backgroundWidget";
import textWidget from "./widgets/textWidget";
import rectWidget from "./widgets/rectWidget";
import layoutWidget from './widgets/layoutWidget'
import carouselWidget from './widgets/carouselWidget'
import pilotlampWidget from './widgets/pilotlampWidget'
import commonWidget from './widgets/commonWidget'
import widgets from './data'

export default {
  components: {
    imageWidget,
    backgroundWidget,
    textWidget,
    rectWidget,
    layoutWidget,
    carouselWidget,
    pilotlampWidget,
    commonWidget
  },
  data() {
    return {
      current: null,
      widgets: widgets
    };
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
    }
  },
  created() {
    this.current = this.widgets[1];
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.left-side {
  background-color: #fff;
  box-sizing: border-box;
  border-right: 1px solid rgb(224, 224, 224);
  display: flex;
  .widget-list {
    width: 40px;
    height: 100%;
    border-right: 1px solid rgb(224, 224, 224);
    .widget-item {
      display: block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      transition: 0.2s;
      border-radius: 2px;
      /* color: #fff; */
      &:hover,
      &.active {
        background-color: $colorTheme;
        color: #fff;
      }
    }
  }
  .widget-container {
    width: 200px;
    height: 100%;
  }
}
</style>
