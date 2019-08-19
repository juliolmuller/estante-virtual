import Vue from 'vue'
import Router from 'vue-router'
import Signing from '@/views/Signing.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/entrar',
      name: 'auth',
      component: Signing
    },
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/Library.vue')
        // },
        // {
        //   path: 'estante',
        //   name: 'allBooks',
        //   component: () => import('@/views/AllBooks.vue')
        // },
        // {
        //   path: 'meus-livros',
        //   name: 'myBooks',
        //   component: () => import('@/views/MyBooks.vue')
        // },
        // {
        //   path: 'meus-emprestimos',
        //   name: 'myLoans',
        //   component: () => import('@/views/MyLoans.vue')
        // },
        // {
        //   path: 'perfil',
        //   name: 'myProfile',
        //   component: () => import('@/views/MyProfile.vue')
        }
      ]
    }
  ]
})
