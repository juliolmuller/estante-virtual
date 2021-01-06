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
      const userId = rootGetters['auth/userData']?.id

      return state.books.filter((book) => book.userId === userId)
    },
    userLoans(state, _getters, _rootState, rootGetters) {
      const userId = rootGetters['auth/userData']?.id

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
    removeBook(state, bookId) {
      state.books = state.books.filter(({ id }) => bookId !== id)
    },
    updateOrPushBook(state, book) {
      let stateChanged = false
      const newBooksState = state.books.map((oldBook) => {
        if (oldBook.id === book.id) {
          stateChanged = true
          return book
        }

        return oldBook
      })

      if (stateChanged) {
        state.books = newBooksState
      } else {
        state.books = [...state.books, book]
      }
    },
  },

  actions: {
    async fetchAll({ commit }) {
      commit('setFetching', true)
      commit('setBooks', await booksApi.get())
      commit('setFetching', false)
    },
    async create({ commit, rootGetters }, { name, image }) {
      const loan = false
      const userId = rootGetters['auth/userData'].id
      const newBook = await booksApi.post({ name, image, userId, loan })

      commit('updateOrPushBook', newBook)

      return newBook
    },
    async update({ commit }, { id, name, image, userId, loan }) { // eslint-disable-line object-curly-newline
      const book = await booksApi.put({
        id, name, image, userId, loan,
      })

      commit('updateOrPushBook', book)
    },
    async borrow({ dispatch, rootGetters }, { id }) {
      // eslint-disable-next-line no-shadow
      const book = rootGetters['books/allBooks'].find((book) => book.id === id)
      const date = new Date().toISOString().slice(0, 10)
      const userId = rootGetters['auth/userData'].id
      const loan = { date, userId }

      await dispatch('update', { ...book, loan })
    },
    async return({ dispatch, rootGetters }, { id }) {
      // eslint-disable-next-line no-shadow
      const book = rootGetters['books/allBooks'].find((book) => book.id === id)
      const loan = false

      await dispatch('update', { ...book, loan })
    },
    async delete({ commit }, { id }) {
      await booksApi.delete(id)
      commit('removeBook', id)
    },
  },
}
