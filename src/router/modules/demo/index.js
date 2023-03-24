export default [
  {
    path: '/v-slot',
    name: 'v-slot',
    component: () => import('@/views/demo/v-slot/index'),
    meta: {
      auth: false,
      title: '插槽'
    }
  },
  {
    path: '/m-table',
    name: 'm-table',
    component: () => import('@/views/demo/m-table/index'),
    meta: {
      auth: false,
      title: '表格'
    }
  },
  {
    path: '/m-filter',
    name: 'm-filter',
    component: () => import('@/views/demo/m-filter/index'),
    meta: {
      auth: false,
      title: '过滤器'
    }
  },
  {
    path: '/m-provider',
    name: 'm-provider',
    component: () => import('@/views/demo/m-provider/index'),
    meta: {
      auth: false,
      title: 'provider'
    }
  },
  {
    path: '/m-file',
    name: 'm-file',
    component: () => import('@/views/demo/m-file/index'),
    meta: {
      auth: false,
      title: 'file'
    }
  },
  {
    path: '/m-qrcode',
    name: 'm-qrcode',
    component: () => import('@/views/demo/m-qrcode/index'),
    meta: {
      auth: false,
      title: 'file'
    }
  },
  {
    path: '/m-class',
    name: 'm-class',
    component: () => import('@/views/demo/class/index'),
    meta: {
      auth: false,
      title: 'file'
    }
  },
  {
    path: '/m-blob',
    name: 'm-blob',
    component: () => import('@/views/demo/m-blob/index'),
    meta: {
      auth: false,
      title: 'blob'
    }
  },
  {
    path: '/m-print',
    name: 'm-print',
    component: () => import('@/views/demo/m-print/index'),
    meta: {
      auth: false,
      title: 'print'
    }
  },
  {
    path: '/m-component',
    name: 'm-component',
    component: () => import('@/views/demo/m-component/index'),
    meta: {
      auth: false,
      title: 'component'
    }
  },
  {
    path: '/m-forOf',
    name: 'm-forOf',
    component: () => import('@/views/demo/m-forOf/index'),
    meta: {
      auth: false,
      title: 'forOf'
    }
  },
  {
    path: '/m-object',
    name: 'm-object',
    component: () => import('@/views/demo/m-object/index'),
    meta: {
      auth: false,
      title: 'file'
    }
  },
  {
    path: '/m-editor',
    name: 'm-tinymce',
    component: () => import('@/views/demo/m-editor/index'),
    meta: {
      auth: true,
      title: 'm-editor'
    }
  },
  {
    path: '/m-utils',
    name: 'm-utils',
    component: () => import('@/views/demo/m-utils/index'),
    meta: {
      auth: false,
      title: 'm-utils'
    }
  },
  {
    path: '/m-crypto',
    name: 'm-crypto',
    component: () => import('@/views/demo/m-crypto/index'),
    meta: {
      auth: false,
      title: 'm-crypto'
    }
  },
  {
    path: '/m-sm4',
    name: 'm-sm4',
    component: () => import('@/views/demo/m-sm4/index'),
    meta: {
      auth: false,
      title: 'm-sm4'
    }
  },
  {
    path: '/m-modify',
    name: 'm-modify',
    component: () => import('@/views/demo/m-modify/index'),
    meta: {
      auth: true,
      title: 'm-modify'
    }
  },
  {
    path: '/modify-detail',
    name: 'modify-detail',
    component: () => import('@/views/demo/m-modify/modify-detail'),
    meta: {
      auth: true,
      title: 'modify-detail'
    }
  },
  {
    path: '/m-vuex',
    name: 'm-vuex',
    component: () => import('@/views/demo/m-vuex/index'),
    meta: {
      auth: false,
      title: 'm-vuex'
    }
  },
  {
    path: '/m-i18n',
    name: 'm-i18n',
    component: () => import('@/views/demo/m-i18n/index'),
    meta: {
      auth: false,
      title: 'm-i18n'
    }
  },
  {
    path: '/m-directive',
    name: 'm-directive',
    component: () => import('@/views/demo/m-directive/index'),
    meta: {
      auth: false,
      title: 'm-directive'
    }
  },
  {
    path: '/m-index_uniq',
    name: 'm-index_uniq',
    component: () => import('@/views/demo/m-file/index_uniq'),
    meta: {
      auth: false,
      title: 'm-index_uniq'
    }
  },
  {
    path: '/m-parse',
    name: 'm-parse',
    component: () => import('@/views/demo/m-parse/index'),
    meta: {
      auth: false,
      title: 'm-parse'
    }
  }
]
