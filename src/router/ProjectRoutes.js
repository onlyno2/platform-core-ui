const List = () => import('@/pages/projects/List')
const Show = () => import('@/pages/projects/Show')
const Edit = () => import('@/pages/projects/Edit')
const Create = () => import('@/pages/projects/Create')

export default [
  {
    path: '/projects',
    name: 'Danh sách dự án',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects/:id/show',
    name: 'Chi tiết dự án',
    component: Show,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects/:id/edit',
    name: 'Cập nhật dự án',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects/create',
    name: 'Tạo mới dự án',
    component: Create,
    meta: {
      requiresAuth: true
    }
  }
]