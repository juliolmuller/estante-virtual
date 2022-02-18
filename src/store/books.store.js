import { defineStore } from 'pinia'
import { booksApi } from '@/services/api'
import { useAuth } from './auth.store'

export const useBooks = defineStore('books', {
  state: () => ({
    books: [],
    isLoading: false,
  }),

  getters: {
    availableBooks: (state) => state.books.filter((book) => !book.loan),
    borrowedBooks: (state) => state.books.filter((book) => book.loan),
    userBooks(state) {
      const userId = useAuth().userData?.id

      return state.books.filter((book) => book.userId === userId)
    },
    userLoans(state) {
      const userId = useAuth().userData?.id

      return state.books.filter((book) => book.loan?.userId === userId)
    },
  },

  actions: {
    updateOrPushBook(newBook) {
      let stateChanged = false
      this.books = this.books.map((oldBook) => {
        if (oldBook.id === newBook.id) {
          stateChanged = true
          return newBook
        }

        return oldBook
      })

      !stateChanged && this.books.push(newBook)
    },
    async fetchAll() {
      this.isLoading = true
      this.books = await booksApi.get()
      this.isLoading = false
    },
    async create({ name, image }) {
      const loan = false
      const userId = useAuth().userData?.id
      const newBook = await booksApi.post({ name, image, userId, loan })
      this.updateOrPushBook(newBook)

      return newBook
    },
    async update({ id, name, image, userId, loan }) {
      const book = await booksApi.put({
        id, name, image, userId, loan,
      })
      this.updateOrPushBook(book)
    },
    async borrow(book) {
      const date = new Date().toISOString().slice(0, 10)
      const userId = useAuth().userData?.id
      const loan = { date, userId }
      await this.update({ ...book, loan })
    },
    async return(book) {
      const loan = false
      await this.update({ ...book, loan })
    },
    async delete(bookId) {
      await booksApi.delete(bookId)
      this.books = this.books.filter(({ id }) => id !== bookId)
    },
  },
})
