import {
  setUserToken,
  getUserToken,
  delUserToken
} from '@/utils/user.js'

const state = {
  token: getUserToken(),
  userInfo: null,
  collectMenus: []
}

const mutations = {
  DEL_TOKEN: (state) => {
    state.token = null
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_COLLECT_MENU: (state, collectMenu) => {
    state.collectMenus.push(collectMenu)
  },
  DEL_COLLECT_MENU: (state, collectMenu) => {
    let index = -1
    for (let i = 0; i < state.collectMenus.length; i++) {
      if (state.collectMenus[i].path === collectMenu.path) {
        index = i
        continue
      }
    }
    if (index > -1) {
      state.collectMenus.splice(index, 1)
    }
  }
}

const actions = {
  login({
    commit
  }, userInfo) {
    // TODO 登录获取用户token
    const userToken = 'user1'
    // END 登录获取用户token
    setUserToken(userToken)
  },
  logout({
    commit
  }) {
    delUserToken()
    commit('DEL_TOKEN')
  },
  getUserInfo({
    commit
  }) {
    // TODO 去后台请求用户信息及权限
    const userInfo = {
      name: 'gdp',
      age: '29'
    }
    // END 去后台请求用户信息及权限
    commit('SET_USERINFO', userInfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
