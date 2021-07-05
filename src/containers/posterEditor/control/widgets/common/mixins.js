import { settingContent, settingItem, settingRow, radioGroup } from 'poster/commonUI'
import positionControl from './positionControl'
import { mapActions } from 'poster/poster.vuex'
export const commonMixin = {
  components: {
    settingContent,
    settingItem,
    settingRow,
    radioGroup,
    positionControl
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    dragInfo() {
      return this.item.dragInfo
    },
    wState() {
      return this.item.wState
    },
    style() {
      return this.wState.style
    }
  },
  methods: {
    ...mapActions(['updateWidgetState']),
    ...mapActions({
      'pushHistory': 'history/push'
    }),
    updateStyle(styleKey, value, pushHistory = true, index = -1) {  
      // 如果只参数了三个参数，并且第三个参数是数字，第三个是index
      if(arguments.length == 3 && typeof pushHistory === 'number') {
        index = pushHistory
      }
      console.log(styleKey, value, index)
      this.updateWidgetState({
        keyPath: 'style.' + styleKey,
        // keyPath: styleKey,
        value,
        widgetId: this.item.id,
        pushHistory,
        index
      })
    }
  }
}
