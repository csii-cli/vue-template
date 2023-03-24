export default [
  {
    path: '/m-article',
    name: 'm-article',
    component: () => import('@/views/article/index'),
    meta: {
      auth: false,
      title: '文章'
    }
  },
  {
    path: '/m-det/:id',
    name: 'm-det',
    component: () => import('@/views/article/demo'),
    meta: {
      auth: false,
      title: '文章'
    }
  }
]
