import { defineStore } from 'pinia'
import { Book } from '@/models'
import { booksApi } from '@/services/api'
import useAuth from './auth.store'

export interface BookStoreState {
  isLoading: boolean
  books: Book[]
}

export interface BookStoreActions {
  updateOrPushBook: (newBook: Book) => void
  fetchAll: () => Promise<void>
  create: (bookData: Omit<Book, 'id'>) => Promise<Book>
  update: (bookData: Book) => Promise<void>
  borrow: (book: Book) => Promise<void>
  return: (book: Book) => Promise<void>
  delete: (bookId: Book['id']) => Promise<void>
}

const useBookStore = defineStore<'books', BookStoreState, any, BookStoreActions>('books', {
  state: () => ({
    isLoading: true,
    books: [],
  }),

  getters: {
    availableBooks: (state: BookStoreState) => state.books.filter((book) => !book.loan),
    borrowedBooks: (state: BookStoreState) => state.books.filter((book) => book.loan),
    userBooks(state: BookStoreState) {
      const userId = useAuth().userData?.id

      return state.books.filter((book) => book.userId === userId)
    },
    userLoans(state: BookStoreState) {
      const userId = useAuth().userData?.id

      return state.books.filter((book) => {
        return book.loan && book.loan.userId === userId
      })
    },
  },

  actions: {
    updateOrPushBook(newBook: Book) {
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
      const newBook = await booksApi.create({ name, image, userId, loan })
      this.updateOrPushBook(newBook)

      return newBook
    },
    async update({ id, name, image, userId, loan }) {
      const book = await booksApi.update(id, {
        name, image, userId, loan,
      })
      this.updateOrPushBook(book)
    },
    async borrow(book) {
      const date = new Date().toISOString().slice(0, 10)
      const userId = useAuth().userData?.id as number
      const loan = { date, userId }
      await this.update({ ...book, loan })
    },
    async return(book) {
      const loan = false
      await this.update({ ...book, loan })
    },
    async delete(bookId) {
      await booksApi.destroy(bookId)
      this.books = this.books.filter(({ id }) => id !== bookId)
    },
  },
})

export default useBookStore
