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

const style = {
  borderColor: '#409EFF',
  borderWidth: 1, // px
  borderStyle: 'solid',
  backgroundColor: '', 
}

// 文本Widget
export default class LayoutWidget extends Widget {
  constructor(config) {
    let styles = []
    switch(config.type) {
      case 'grid-4':
      case 'col-4':
      case 'row-4':
        for(let i = 0; i< 4; i++) {
          styles.push(_.cloneDeep(style))
        }
        break;
      case 'grid-9':
        for(let i = 0; i< 9; i++) {
          styles.push(_.cloneDeep(style))
        }
        break;
      default:   
        styles = [_.cloneDeep(style)]  
        break;  
    }
    config = _merge({
      type: 'layout',
      typeLabel: '网格',
      componentName: 'layout-widget',
      icon: 'icon-text',
      lock: false,
      visible: true,
      wState: { 
        type: config.type,
        style: styles
      }
    }, config)
    super(config)
    this._codeGen = codeGen
  }
}
