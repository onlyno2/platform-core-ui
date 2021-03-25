import router from '../router/index'
import { auth, api_v1 } from '../util/api_caller.util'

export class AuthService {
  static async login(user) {
    const response = await auth.post('/login', { user: user })
    if(response.status === 200) {
      let auth_token = response.headers.authorization
      localStorage.setItem('auth-token', auth_token)
      auth.defaults.headers.Authorization = auth_token
      api_v1.defaults.headers.Authorization = auth_token
      router.push('/dashboard')
    }
  }

  static async logout() {
    const response = await auth.delete('/logout')
    if(response.status === 200) {
      localStorage.removeItem('auth-token')
      auth.defaults.headers.Authorization = null
      api_v1.defaults.headers.authorization = null
      router.push('/login')
    }
  }
}