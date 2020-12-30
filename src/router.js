import Vue from 'vue'
import VueRouter from 'vue-router'
import Signing from './views/Signing'
import store from './store'

Vue.use(VueRouter)

const checkCredentials = async (to, from, next) => {
  const isAuthenticated = await store.dispatch('isAuthenticated')

  if (isAuthenticated) {
    next()
  } else {
    next({ name: 'auth' })
  }
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/entrar',
      name: 'auth',
      component: Signing,
    },
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      beforeEnter: checkCredentials,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/app/Library.vue'),
        },
        {
          path: 'livros/:bookId',
          name: 'bookDetails',
          component: () => import('@/views/app/BookDetails.vue'),
          props: true,
        },
        {
          path: 'meus-livros',
          name: 'myBooks',
          component: () => import('@/views/app/MyBooks.vue'),
        },
        {
          path: 'meus-emprestimos',
          name: 'myLoans',
          component: () => import('@/views/app/MyLoans.vue'),
        },
        {
          path: 'perfil',
          name: 'myProfile',
          component: () => import('@/views/app/MyProfile.vue'),
        },
      ],
    },
  ],
})

export default router
