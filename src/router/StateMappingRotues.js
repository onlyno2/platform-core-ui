const List = () => import('@/pages/state_mappings/List')
const Edit = () => import('@/pages/state_mappings/Edit')
const Create = () => import('@/pages/state_mappings/Create')

export default [
  {
    path: '/mappings',
    name: 'Danh sách trạng thái thiết bị',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mappings/create',
    name: 'Tạo mới trạng thái thiết bị',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mappings/:id/edit',
    name: 'Cập nhật trạng thái thiết bị',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  }
]