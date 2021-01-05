import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.store'
import books from './modules/books.store'
import users from './modules/users.store'

Vue.use(Vuex)

const store = new Vuex.Store({

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

export default store
