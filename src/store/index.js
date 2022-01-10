import { createStore } from 'vuex'
import auth from './modules/auth.store'
import books from './modules/books.store'
import users from './modules/users.store'

export default createStore({
  getters: {
    isLoading(_state, getters) {
      return getters['books/isFetching'] || getters['users/isFetching']
    },
  },

  modules: {
    auth,
    books,
    users,
  },
})
