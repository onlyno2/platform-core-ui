import Vue from 'vue'
import Router from '../router/index'
import axios from 'axios'
import { BASE_URL, API_V1_URL } from '../.env'

var auth = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
})

auth.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let error_message = ''
  if(error.response.status === 401) {
    localStorage.removeItem('auth-token')
    error_message = error.response.data.error
    Router.push('/login')
  }
  Vue.$toast.error(error_message)
  return Promise.reject(error)
})

var api_v1 = axios.create({
  baseURL: API_V1_URL,
  timeout: 3000,
  headers: {
    'Authorization': localStorage.getItem('auth_token')
  }
})

api_v1.interceptors.request.use(function (config) {
  const auth_token = localStorage.getItem('auth-token')
  config.headers.Authorization = auth_token

  return config
})

api_v1.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let error_message = ''
  if(error.response.status === 401) {
    localStorage.removeItem('auth-token')
    error_message = error.response.data.error
    Router.push('/login')
  }
  Vue.$toast.error(error_message)
  return Promise.reject(error)
})


export {
  auth,
  api_v1
}