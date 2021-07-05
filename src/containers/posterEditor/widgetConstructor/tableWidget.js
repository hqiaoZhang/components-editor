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
export default class TableWidget extends Widget {
  constructor(config) {
    config = _merge({
      type: 'table',
      typeLabel: '表格',
      componentName: 'table-widget',
      icon: 'icon-table',
      lock: false,
      visible: true,
      wState: { 
        style: {
          margin: '10px',
          wordBreak: 'break-all',
          color: '#000',
          textAlign: 'center',
          fontSize: '14px', // px
          padding: 0, // px
          borderColor: '#000',
          borderWidth: 0, // px
          borderStyle: 'solid',
          lineHeight: '100%', // %
          letterSpacing: 0, // %
          backgroundColor: '',
          fontWeight: '',
          fontStyle: '',
          textDecoration: ''
        }
      }
    }, config)
    super(config)
    this._codeGen = codeGen
  }
}
