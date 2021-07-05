import Widget from './widget'
import _merge from 'lodash/merge'
import { createHtmlStr } from 'poster/utils'

function codeGen(config) {
  return createHtmlStr({
    tag: 'div',
    style: {
      ...Widget.getPositionStyle(config.dragInfo)
    },
    children: [
      {
        tag: 'div', 
        style: {
          ...config.wState.style
        }
      }
    ]
  })
}

// 文本Widget
export default class TextCarouselWidget extends Widget {
  constructor(config) {
    config = _merge({
      type: 'layout',
      typeLabel: '轮播',
      componentName: 'text-carousel-widget',
      icon: 'icon-text',
      lock: false,
      visible: true,
      wState: { 
        style: {
          borderColor: '#409EFF',
          borderWidth: 1, // px
          borderStyle: 'solid',
          backgroundColor: '',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      }
    }, config)
    super(config)
    this._codeGen = codeGen
  }
}
