const List = () => import('@/pages/devices/List')
const Show = () => import('@/pages/devices/Show')
const Edit = () => import('@/pages/devices/Edit')
const Create = () => import('@/pages/devices/Create')
const AfterCreate = () => import('@/pages/devices/AfterCreate')

export default [
  {
    path: '/devices',
    name: 'Danh sách thiết bị',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/devices/after_create',
    name: 'Thiết bị vừa tạo',
    component: AfterCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/devices/create',
    name: 'Tạo mới thiết bị',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/devices/:id/show',
    name: 'Chi tiết thiết bị',
    component: Show,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/devices/:id/edit',
    name: 'Cập nhật thiết bị',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  }
]