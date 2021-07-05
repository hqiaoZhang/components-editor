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
export default class PilotlampWidget extends Widget {
  constructor(config) {
    config = _merge({
      type: 'layout',
      typeLabel: '指示灯',
      componentName: 'pilotlamp-widget',
      icon: 'icon-text',
      lock: false,
      visible: true,
      wState: { 
        style: {
          color: '#000',
          textAlign: 'center',
          fontSize: '24px', // px
        }
      }
    }, config)
    super(config)
    this._codeGen = codeGen
  }
}
