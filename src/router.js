import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from './views/Auth'
import SignIn from './views/Auth/SignIn'
import SignUp from './views/Auth/SignUp'
import store from './store'

Vue.use(VueRouter)

const checkCredentials = (_to, _from, next) => {
  store.commit('auth/retrieveFromStorage')

  if (store.getters['auth/isAuthenticated']) {
    next()
  } else {
    next({ name: 'SignIn' })
  }
}

const routes = [
  {
    path: '/entrar',
    component: Auth,
    children: [
      {
        path: '/entrar',
        name: 'SignIn',
        component: SignIn,
      },
      {
        path: '/cadastrar',
        name: 'SignUp',
        component: SignUp,
      },
    ],
  },
  {
    path: '/',
    component: () => import('./views/Home'),
    beforeEnter: checkCredentials,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('./views/Home/Bookshelves'),
      },
      {
        path: '/livros/:bookId',
        name: 'BookDetails',
        component: () => import('./views/Home/BookDetails'),
        props: true,
      },
      {
        path: '/meus-livros',
        name: 'UserBooks',
        component: () => import('./views/Home/UserBooks'),
      },
      {
        path: '/meus-emprestimos',
        name: 'UserLoans',
        component: () => import('./views/Home/UserLoans'),
      },
      {
        path: '/meu-perfil',
        name: 'UserProfile',
        component: () => import('./views/Home/UserProfile'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
