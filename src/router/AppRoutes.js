const List = () => import('@/pages/apps/List')
const Show = () => import('@/pages/apps/Show')
const Edit = () => import('@/pages/apps/Edit')
const Create = () => import('@/pages/apps/Create')
const AfterCreate = () => import('@/pages/apps/AfterCreate')

export default [
  {
    path: '/apps',
    name: 'Danh sách ứng dụng',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/apps/after_create',
    name: 'Ứng dụng vừa tạo',
    component: AfterCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/apps/create',
    name: 'Thêm mới ứng dụng',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/apps/:id/show',
    name: 'Chi tiết ứng dụng',
    component: Show,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/apps/:id/edit',
    name: 'Cập nhật ứng dụng',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  }
]