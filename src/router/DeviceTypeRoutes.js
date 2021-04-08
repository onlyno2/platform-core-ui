const List = () => import('@/pages/device_types/List')
const Show = () => import('@/pages/device_types/Show')
const Edit = () => import('@/pages/device_types/Edit')
const Create = () => import('@/pages/device_types/Create')

export default [
  {
    path: '/device_types',
    name: 'Danh sách loại thiết bị',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/device_types/create',
    name: 'Tạo mới loại thiết bị',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/device_types/:id/show',
    name: 'Chi tiết loại thiết bị',
    component: Show,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/device_types/:id/edit',
    name: 'Cập nhật loại thiết bị',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  }
]