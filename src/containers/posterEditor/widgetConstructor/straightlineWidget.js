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
        text: config.wState.text,
        style: {
          ...config.wState.style
        }
      }
    ]
  })
}
// 
// 表格Widget
export default class StraightlineWidget extends Widget {
  constructor(config) {
    config = _merge({
      type: 'straightline',
      typeLabel: '直线',
      componentName: 'straightline-widget',
      icon: 'icon-table',
      lock: false,
      visible: true,
      wState: { 
        style: {
          borderColor: '#409EFF',
          borderWidth: '1px', // px
          borderStyle: 'solid',
          type: 'triangle_right',
          backgroundColor: '',
        }
      }
    }, config)
    super(config)
    this._codeGen = codeGen
  }
}
