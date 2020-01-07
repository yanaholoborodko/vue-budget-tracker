//lazy loading components, e.g. :
//component: () => import('./views/Login.vue')
//będzie się ładował na żądanie. Jest to optymalizacja, która zmniejsza rozmiar naszej aplikacji, co powoduje szybsze załadowanie całej aplikacji


import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {layout: 'main', auth: true},
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'auth'},
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'auth'},
      component: () => import('./views/Register.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Categories.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Details.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/History.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Planning.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: {layout: 'main', auth: true},
      component: () => import('./views/Record.vue')
    },
  ]
})

//protecting routes in Vue, so that users that haven`t logged in can`t go to pages that only auth users can see
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
