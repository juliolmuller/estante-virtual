import { booksApi } from '../../services/api'

export default {
  namespaced: 'books',

  state: {
    isFetching: false,
    books: [],
  },

  getters: {
    isFetching: (state) => state.isFetching,
    allBooks: (state) => state.books,
    availableBooks: (state) => state.books.filter((book) => !book.loan),
    borrowedBooks: (state) => state.books.filter((book) => book.loan),
    userBooks(state, _getters, _rootState, rootGetters) {
      const userId = rootGetters['auth/userData'].id

      return state.books.filter((book) => book.userId === userId)
    },
    userLoans(state, _getters, _rootState, rootGetters) {
      const userId = rootGetters['auth/userData'].id

      return state.books.filter((book) => book.loan?.userId === userId)
    },
  },

  mutations: {
    setFetching(state, fetchingStatus) {
      state.isFetching = fetchingStatus
    },
    toggleFetching(state) {
      state.isFetching = !state.isFetching
    },
    setBooks(state, books) {
      state.books = books
    },
  },

  actions: {
    async fetchAll({ commit }) {
      commit('setFetching', true)
      commit('setBooks', await booksApi.get())
      commit('setFetching', false)
    },
  },
}
