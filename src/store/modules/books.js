import api from '@/services/api/books'

export default {

  state: {
    books: [],
    userBooks: [],
    userLoans: []
  },

  getters: {
    allBooks: state => state.books,
    userBooks: state => state.userBooks,
    userLoans: state => state.userBooks
  },

  mutations: {
    setBooks: (state, books) => state.books = books,
    setUserBooks: (state, books) => state.userBooks = books,
    setUserLoans: (state, books) => state.userLoans = books
  },

  actions: {
    fetchBooks({ commit }) {
      api.get()
        .then(response => commit('setBooks', response.data))
    },
    fetchUserBooks({ commit }, userId) {
      api.get({ userId })
        .then(response => commit('setUserBooks', response.data))
    },
    fetchUserLoans({ commit }, userId) {
      api.get({ 'loan.userId': userId })
        .then(response => commit('setUserLoans', response.data))
    }
  }
}
