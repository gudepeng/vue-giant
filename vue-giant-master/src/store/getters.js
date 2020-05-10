const getters = {
  token: state => state.user.token,
  collectMenus: state => state.setting.collectMenus,
  userInfo: state => state.user.userInfo
}
export default getters
