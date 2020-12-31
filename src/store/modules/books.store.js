/* eslint-disable no-return-assign */
import { booksApi } from '../../services/api'

export default {

  state: {
    books: [],
    userBooks: [],
    userLoans: [],
    searchCriteria: '',
    filterCriteria: {
      available: true,
      unavailable: false,
    },
  },

  getters: {
    allBooks: (state) => state.books,
    userBooks: (state) => state.userBooks,
    userLoans: (state) => state.userLoans,
    filterCriteria: (state) => state.filterCriteria,
    searchCriteria: (state) => state.searchCriteria,
    results: (state) => {
      return state.books.filter((book) => {
        return (state.filterCriteria.available && !book.loan) || (state.filterCriteria.unavailable && book.loan)
      }).filter((book) => {
        return book.name.toLowerCase().indexOf(state.searchCriteria.toLowerCase()) > -1
      })
    },
  },

  mutations: {
    setBooks: (state, books) => state.books = books,
    setUserBooks: (state, books) => state.userBooks = books,
    setUserLoans: (state, books) => state.userLoans = books,
    setFilter: (state, filter) => state.filterCriteria = filter,
    setSearch: (state, search) => state.searchCriteria = search,
  },

  actions: {
    async fetchBooks({ commit }) {
      commit('setBooks', await booksApi.get())
    },
    async fetchUserBooks({ commit }, userId) {
      commit('setUserBooks', await booksApi.get({ userId }))
    },
    async fetchUserLoans({ commit }, userId) {
      commit('setUserLoans', await booksApi.get({ 'loan.userId': userId }))
    },
    setFilter({ commit }, { available, unavailable }) {
      commit('setFilter', { available, unavailable })
    },
    setSearch({ commit }, searchTerm) {
      commit('setSearch', searchTerm)
    },
  },
}
