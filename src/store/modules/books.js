import api from '@/services/api/books'

// Export module parts (state, getters, mutations & actions)
export default {

  /**
   * List of stored states
   */
  state: {
    books: [],
    userBooks: [],
    userLoans: []
  },

  /**
   * List of exposed data
   */
  getters: {
    allBooks: state => state.books,
    userBooks: state => state.userBooks,
    userLoans: state => state.userLoans
  },

  /**
   * Methods to mutate stored states
   */
  mutations: {
    setBooks: (state, books) => state.books = books,
    setUserBooks: (state, books) => state.userBooks = books,
    setUserLoans: (state, books) => state.userLoans = books
  },

  /**
   * Methods to manipulate stored states
   */
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
