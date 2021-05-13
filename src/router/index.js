import Vue from 'vue'
import Router from 'vue-router'

// Containers
const Layout = () => import('@/layout/Layout')
const Dashboard = () => import('@/views/Dashboard')


import AuthRoutes from './AuthRoutes'
import ProjectRoutes from './ProjectRoutes'
import DeviceTypeRoutes from './DeviceTypeRoutes'
import DeviceRoutes from './DeviceRoutes'
import AppRoutes from './AppRoutes'
import RuleRoutes from './RuleRoutes'
import StateMappingRoutes from './StateMappingRotues'
import SchemaRoutes from './SchemaRoutes'

Vue.use(Router)

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    ...AuthRoutes,
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Trang chủ',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        ...DeviceTypeRoutes,
        ...ProjectRoutes,
        ...DeviceRoutes,
        ...AppRoutes,
        ...RuleRoutes,
        ...StateMappingRoutes,
        ...SchemaRoutes,
      ]
    }
  ]
}

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(localStorage.getItem('auth-token') === null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router