import Vue from 'vue'
import Vuex from 'vuex'
import books from './modules/books'
import users from './modules/users'

// Inject Vuex into the framework
Vue.use(Vuex)

// Load modules into Store
export default new Vuex.Store({
  modules: {
    books,
    users
  }
})
