import axios from 'axios'
import { getUserToken } from '@/utils/user'
import { Message } from 'element-ui'

const server = axios.create({
  baseURL: '/api'
})

server.interceptors.request.use(
  config => {
    const token = getUserToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

server.interceptors.response.use(
  response => {
    return response
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error.response)
  }
)

export default server
