export function setUserToken(token) {
  localStorage.setItem('token', token)
}
export function getUserToken(token) {
  return localStorage.getItem('token')
}
export function delUserToken(token) {
  localStorage.removeItem('token')
}
