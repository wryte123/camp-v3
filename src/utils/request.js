import axios from 'axios';

export const service = axios.create({
	baseURL: '/api',
	timeout: 120000,
})
// 添加请求拦截器
service.interceptors.request.use((config) => {
  // 从localStorage中获取token
  const token = localStorage.getItem('token')
  if (token)
    config.headers.token = token
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
