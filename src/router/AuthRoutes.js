const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')

export default [
  {
    path: '/login',
    name: 'Đăng nhập',
    component: Login
  },
  {
    path: '/register',
    name: 'Đăng ký',
    component: Register
  }
]