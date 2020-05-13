export function setUserToken(token) {
  localStorage.setItem('token', token)
}
export function getUserToken() {
  return localStorage.getItem('token')
}
export function delUserToken() {
  localStorage.removeItem('token')
}
