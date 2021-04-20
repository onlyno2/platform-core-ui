const List = () => import('@/pages/schemas/List')
const Edit = () => import('@/pages/schemas/Edit')
const Show = () => import('@/pages/schemas/Show')
const Create = () => import('@/pages/schemas/Create')

export default [
  {
    path: '/schemas',
    name: 'Danh sách schema',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/schemas/:id/show',
    name: 'Chi tiết schema',
    component: Show,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/schemas/create',
    name: 'Tạo mới schema',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/schemas/:id/edit',
    name: 'Cập nhật schema',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  }
]