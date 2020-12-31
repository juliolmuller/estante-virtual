import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.store'
import books from './modules/books.store'
import users from './modules/users.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    books,
    users,
  },
})

export default store
