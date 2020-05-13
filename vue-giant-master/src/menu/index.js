const menu = [
  {
    title: '子系统分类一',
    appPath: 'app1',
    entry: '//localhost:8081',
    child: [
      {
        path: '/',
        title: '子系统菜单一'
      },
      {
        path: '/home2',
        title: '子系统菜单二'
      },
      {
        path: '/home3',
        title: '子系统菜单三'
      },
      {
        path: '/home4',
        title: '子系统菜单四'
      }
    ]
  },
  {
    title: '子系统分类二',
    appPath: 'app2',
    entry: '//localhost:8081',
    child: [
      {
        path: '/home',
        title: '子系统系统二菜单一'
      }
    ]
  }
]

export default menu
