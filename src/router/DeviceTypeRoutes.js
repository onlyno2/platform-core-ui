const List = () => import('@/pages/device_types/List')
const Show = () => import('@/pages/device_types/Show')
const Edit = () => import('@/pages/device_types/Edit')
const Create = () => import('@/pages/device_types/Create')

export default [
  {
    path: '/device_types',
    name: 'DeviceTypeList',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/device_types/create',
    name: 'DeviceTypeCreate',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/device_types/:id/show',
    name: 'DeviceTypeShow',
    component: Show,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/device_types/:id/edit',
    name: 'DeviceTypeEdit',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  }
]