const state = {
  collectMenus: []
}

const mutations = {
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
  login({ commit }, userInfo) {

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
