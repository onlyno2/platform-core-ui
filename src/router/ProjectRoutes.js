const List = () => import('@/pages/projects/List')
const Show = () => import('@/pages/projects/Show')
const Edit = () => import('@/pages/projects/Edit')
const Create = () => import('@/pages/projects/Create')

export default [
  {
    path: '/projects',
    name: 'ProjectList',
    component: List,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects/:id/show',
    name: 'ProjectShow',
    component: Show,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects/:id/edit',
    name: 'ProjectEdit',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/projects/create',
    name: 'ProjectCreate',
    component: Create,
    meta: {
      requiresAuth: true
    }
  }
]