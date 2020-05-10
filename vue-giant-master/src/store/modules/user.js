import {
  setUserToken,
  getUserToken,
  delUserToken
} from '@/utils/user.js'

const state = {
  token: getUserToken(),
  userInfo: null
}

const mutations = {
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  login({ commit }, userInfo) {
    setUserToken('user1')
  },
  logout({ commit }) {
    delUserToken()
  },
  getUserInfo({ commit }) {
    const userInfo = {
      name: 'gdp',
      age: '29'
    }
    commit('SET_USERINFO', userInfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
