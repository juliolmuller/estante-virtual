import { createRouter, createWebHistory, NavigationGuard, RouteRecordRaw } from 'vue-router'
import Auth from '@/pages/Auth/index.vue'
import SignIn from '@/pages/Auth/SignIn.vue'
import SignUp from '@/pages/Auth/SignUp.vue'
import store, { useAuth } from '@/store'

const Home = () => import(/* webpackPrefetch: true */ '@/pages/Home/index.vue')
const Bookshelves = () => import(/* webpackPrefetch: true */ '@/pages/Home/Bookshelves.vue')
const BookDetails = () => import(/* webpackPrefetch: true */ '@/pages/Home/BookDetails.vue')
const BooksManager = () => import(/* webpackPrefetch: true */ './pages/Home/BooksManager.vue')
const UserProfile = () => import(/* webpackPrefetch: true */ './pages/Home/UserProfile.vue')

const checkAuthentication: NavigationGuard = (_to, _from, next) => {
  const auth = useAuth(store)

  if (auth.isAuthenticated) {
    next()
    return
  }

  auth.recoverFromStorage()

  if (auth.isAuthenticated) {
    next()
    return
  }

  next({ name: 'SignIn' })
}

const routes: RouteRecordRaw[] = [
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
    beforeEnter: checkAuthentication,
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
    path: '/(.*)',
    redirect: '/',
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
