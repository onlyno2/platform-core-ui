const List = () => import('@/pages/device_types/List')

export default [
  {
    path: '/device_types',
    name: 'DeviceType',
    component: List,
    meta: {
      requiresAuth: true
    }
  }
]