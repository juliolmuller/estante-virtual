import api from '@/services/api/books'

// Export module parts (state, getters, mutations & actions)
export default {

  /**
   * List of stored states
   */
  state: {
    books: [],
    userBooks: [],
    userLoans: [],
    searchCriteria: '',
    filterCriteria: {
      available: true,
      unavailable: false
    }
  },

  /**
   * List of exposed data
   */
  getters: {
    allBooks: state => state.books,
    userBooks: state => state.userBooks,
    userLoans: state => state.userLoans,
    filterCriteria: state => state.filterCriteria,
    searchCriteria: state => state.searchCriteria,
    results: state => {
      return state.books.filter(book => {
        return (state.filterCriteria.available && !book.loan) || (state.filterCriteria.unavailable && book.loan)
      }).filter(book => {
        return book.name.toLowerCase().indexOf(state.searchCriteria.toLowerCase()) > -1
      })
    }
  },

  /**
   * Methods to mutate stored states
   */
  mutations: {
    setBooks: (state, books) => state.books = books,
    setUserBooks: (state, books) => state.userBooks = books,
    setUserLoans: (state, books) => state.userLoans = books,
    setFilter: (state, filter) => state.filterCriteria = filter,
    setSearch: (state, search) => state.searchCriteria = search
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
    },
    setFilter({ commit }, { available, unavailable }) {
      commit('setFilter', { available, unavailable })
    },
    setSearch({ commit }, searchTerm) {
      commit('setSearch', searchTerm)
    }
  }
}
