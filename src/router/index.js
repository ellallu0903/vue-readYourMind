import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '讀心 | Read your mind',
      login: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '讀心 | 使用說明',
      login: false
    }
  },
  {
    path: '/test',
    name: 'TestList',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
    meta: {
      title: '讀心 | 所有測驗',
      login: false
    }
  },
  {
    path: '/test/:id',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue'),
    meta: {
      title: '讀心 | 開始測驗',
      login: false
    }
  },
  {
    path: '/knowledge',
    name: 'Knowledge',
    component: () =>
      import(/* webpackChunkName: "knowledge" */ '../views/Knowledge.vue'),
    meta: {
      title: '讀心 | 小知識',
      login: false
    }
  },
  {
    path: '/registered',
    name: 'Registered',
    component: () =>
      import(/* webpackChunkName: "registered" */ '../views/Registered.vue'),
    meta: {
      title: '讀心 | 註冊',
      login: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: '讀心 | 登入',
      login: false
    }
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () =>
      import(/* webpackChunkName: "personal" */ '../views/Personal.vue'),
    meta: {
      title: '讀心 | 個人資料',
      login: true
    }
  },
  {
    path: '/result',
    name: 'Result',
    component: () =>
      import(/* webpackChunkName: "result" */ '../views/Result.vue'),
    meta: {
      title: '讀心 | 測驗結果',
      login: true
    }
  },
  {
    path: '/backstage',
    name: 'Backstage',
    component: () =>
      import(/* webpackChunkName: "backstage" */ '../views/Backstage.vue'),
    children: [
      {
        path: 'about',
        component: () =>
          import(/* webpackChunkName: "backAbout" */ '../views/BackAbout.vue'),
        meta: {
          title: '後台 | 使用說明',
          login: true
        }
      },
      {
        path: 'test',
        component: () =>
          import(/* webpackChunkName: "backTest" */ '../views/BackTest.vue'),
        meta: {
          title: '後台 | 心理測驗',
          login: true
        }
      },
      {
        path: 'knowledge',
        component: () =>
          import(
            /* webpackChunkName: "backKnowledge" */ '../views/BackKnowledge.vue'
          ),
        meta: {
          title: '後台 | 小知識',
          login: true
        }
      },
      {
        path: 'member',
        component: () =>
          import(
            /* webpackChunkName: "backMember" */ '../views/BackMember.vue'
          ),
        meta: {
          title: '後台 | 會員管理',
          login: true
        }
      }
    ],
    meta: {
      title: '讀心 | 後台管理',
      login: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && !store.state.user) {
    next('/login')
  } else {
    next()
  }
})

// 把 title 改成 '使用者的名稱' + 的 XXXX
router.afterEach((to, from) => {
  let title = ''
  title = to.meta.title

  document.title = title
})

export default router
