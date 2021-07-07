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

function rectCodeGen(config) { 
  const style = config.wState.style  
  return createHtmlStr({
    tag: 'div',
    style: {
      ...Object.assign({}, style, {
        borderWidth: style.borderWidth + 'px',
        borderTopLeftRadius: style.borderTopLeftRadius + '%',
        borderTopRightRadius: style.borderTopRightRadius + '%',
        borderBottomLeftRadius: style.borderBottomLeftRadius + '%',
        borderBottomRightRadius: style.borderBottomRightRadius + '%'
      }),
      ...Widget.getPositionStyle(config.dragInfo)
    }
  })
}


// 文本Widget
export default class CommonWidget extends Widget {
  constructor(config) {
    console.log(config)
    config = _merge({
      type: 'text',
      typeLabel: '文本',
      componentName: 'text-widget',
      icon: 'icon-text',
      lock: false,
      visible: true,
      wState: {
        text: '双击编辑文本',
        style: {
          // margin: '10px',
          wordBreak: 'break-all',
          color: '#000',
          textAlign: 'center',
          fontSize: '14px', // px
          // padding: 0, // px
          borderColor: '#000',
          borderWidth: 0, // px
          borderStyle: 'solid',
          lineHeight: '100%', // %
          letterSpacing: 0, // %
          backgroundColor: '#eee', 
          fontStyle: '',
          textDecoration: '',
          boxSizing: 'border-box',
          opacity: 1,
          fontFamily: '微软雅黑',
          fontWeight: 'Regular',
          textShadow: '',
          boxShadow: '',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        }
      }
    }, config)
    console.log(config)
    super(config)
    this._codeGen = codeGen
    
  }
}
