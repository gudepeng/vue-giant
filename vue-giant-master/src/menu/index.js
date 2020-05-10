const menu = [
  {
    title: '子系统一',
    appPath: 'app1',
    entry: '//localhost:8081',
    child: [
      {
        path: '/',
        title: '菜单一'
      }, {
        path: '/home2',
        title: '菜单二'
      }, {
        path: '/home3',
        title: '菜单三'
      }, {
        path: '/home4',
        title: '菜单四'
      }
    ]
  },
  {
    title: '子系统二',
    appPath: 'app2',
    entry: '//localhost:8081',
    child: [
      {
        path: '/home',
        title: '系统二菜单一'
      }
    ]
  }
]

export default menu
