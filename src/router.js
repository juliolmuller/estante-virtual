import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/pages/Auth'
import SignIn from '@/pages/Auth/SignIn'
import SignUp from '@/pages/Auth/SignUp'
import store, { useAuth } from '@/store'

const Home = () => import(/* webpackPrefetch: true */ './pages/Home')
const Bookshelves = () => import(/* webpackPrefetch: true */ './pages/Home/Bookshelves')
const BookDetails = () => import(/* webpackPrefetch: true */ './pages/Home/BookDetails')
const BooksManager = () => import(/* webpackPrefetch: true */ './pages/Home/BooksManager')
const UserProfile = () => import(/* webpackPrefetch: true */ './pages/Home/UserProfile')

const checkAuth = (_to, _from, next) => {
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

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
      beforeEnter: checkAuth,
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
  ],
})

export default router
