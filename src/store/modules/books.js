import api from '@/services/api/books'

export default {

  state: {
    books: []
  },

  getters: {
    allBooks: state => state.books
  },

  mutations: {
    setBooks: (state, books) => state.books = books
  },

  actions: {
    fetchBooks({ commit }) {
      api.get()
        .then(response => commit('setBooks', response.data))
    }
  }
}
