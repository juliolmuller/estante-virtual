import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.store'
import books from './modules/books.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    books,
  },
})

export default store
