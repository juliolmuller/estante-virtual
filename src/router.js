import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from './views/Auth'
import SignIn from './views/Auth/SignIn'
import SignUp from './views/Auth/SignUp'
import store from './store'

const Home = () => import('./views/Home')
const Bookshelves = () => import('./views/Home/Bookshelves')
const BookDetails = () => import('./views/Home/BookDetails')
const BooksManager = () => import('./views/Home/BooksManager')
const UserProfile = () => import('./views/Home/UserProfile')

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
    component: Home,
    beforeEnter: checkCredentials,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Bookshelves,
      },
      {
        path: '/livros/:bookId',
        name: 'BookDetails',
        component: BookDetails,
        props: true,
      },
      {
        path: '/meus-livros',
        name: 'UserBooks',
        component: BooksManager,
        props: {
          title: 'Meus Livros',
          type: 'userBooks',
        },
      },
      {
        path: '/meus-emprestimos',
        name: 'UserLoans',
        component: BooksManager,
        props: {
          title: 'Meus Empréstimos',
          type: 'userLoans',
        },
      },
      {
        path: '/meu-perfil',
        name: 'UserProfile',
        component: UserProfile,
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

export default router
