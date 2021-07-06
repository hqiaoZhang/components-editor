export default  {
  basics: [
    {
      type: 'layout',
      component: 'layout-widget',
      name: '布局',
      icon: '&#xe707;',  
      children: [{
        name: '网格一',
        tips: '4宫格',
        type: 'grid-4', 
        icon: '&#xe64d;',
      },{
        name: '网格二',
        tips: '9宫格',
        type: 'grid-9',
      },{
        name: '横4泳道',
        type: 'row-4',
      },{
        name: '纵4泳道',
        type: 'col-4',
      },{
        name: '横切线',
        type: 'row-1',
      },{
        name: '纵切线',
        type: 'col-1',
      }]
    },
    {
      type: 'common',
      component: 'common-widget',
      name: '通用',
      icon: '&#xe750;',
      children: [{
        name: '文本框', 
        type: 'text',
      },{
        name: '矩形', 
        type: 'rect',
      },{
        name: '圆形',
        type: 'circle',
      },{
        name: '按钮',
        type: 'button',
        componentName: 'el-button'
      },{
        name: '图片',
        type: 'img',
      },{
        name: '表格',
        type: 'table'
      },{
        name: '数字铭牌',
        type: 'number'
      },{
        name: '直线',
        type: 'straightline',
        wState: { 
          style: { 
            borderWidth: '1px', // px
          }
        }
      },{
        name: '曲线',
        type: 'curve'
      }]
    }, 
    {
      type: 'carousel',
      component: 'carousel-widget',
      name: '轮播',
      icon: '&#xe651;',
      children: [
        {
          name: '图片轮播',
          type: 'picture-carousel'
        },{
          name: '文字轮播',
          type: 'text'
        }
      ]
    },
    {
      type: "pilotlamp",
      component: "pilotlamp-widget",
      name: "指示灯",
      icon: "&#xe7df;"
      
    }
  ]
} 