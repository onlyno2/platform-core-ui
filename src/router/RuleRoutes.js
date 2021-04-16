const List = () => import('@/pages/rules/List')
const Show = () => import('@/pages/rules/Show')
const Edit = () => import('@/pages/rules/Edit')
const Create = () => import('@/pages/rules/Create')

export default [
  {
    path: '/rules',
    name: 'Danh sách luật',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/rules/:id/show',
    name: 'Chi tiết luật',
    component: Show,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/rules/:id/edit',
    name: 'Cập nhật luật',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/rules/create',
    name: 'Tạo mới luật',
    component: Create,
    meta: {
      requiresAuth: true
    }
  }
]