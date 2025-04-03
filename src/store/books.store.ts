import { defineStore, type _GettersTree as GettersTree } from 'pinia';

import type { Book } from '~/models';
import { booksApi } from '~/services/api';

import useAuth from './auth.store';

export interface BookStoreState {
  books: Book[];
  isLoading: boolean;
}

export interface BookStoreGetters extends GettersTree<BookStoreState> {
  availableBooks: (state: BookStoreState) => Book[];
  borrowedBooks: (state: BookStoreState) => Book[];
  userBooks: (state: BookStoreState) => Book[];
  userLoans: (state: BookStoreState) => Book[];
}

export interface BookStoreActions {
  borrow: (book: Book) => Promise<void>;
  create: (bookData: Omit<Book, 'id'>) => Promise<Book>;
  delete: (bookId: Book['id']) => Promise<void>;
  fetchAll: () => Promise<void>;
  return: (book: Book) => Promise<void>;
  update: (bookData: Book) => Promise<void>;
  updateOrPushBook: (newBook: Book) => void;
}

const useBookStore = defineStore<'books', BookStoreState, BookStoreGetters, BookStoreActions>(
  'books',
  {
    state: () => ({
      isLoading: true,
      books: [],
    }),

    getters: {
      availableBooks(state) {
        return state.books.filter((book) => !book.loan);
      },
      borrowedBooks(state) {
        return state.books.filter((book) => book.loan);
      },
      userBooks(state) {
        const userId = useAuth().userData?.id;

        return state.books.filter((book) => book.userId === userId);
      },
      userLoans(state) {
        const userId = useAuth().userData?.id;

        return state.books.filter((book) => {
          return book.loan && book.loan.userId === userId;
        });
      },
    },

    actions: {
      updateOrPushBook(newBook) {
        let stateChanged = false;
        this.books = this.books.map((oldBook) => {
          if (oldBook.id === newBook.id) {
            stateChanged = true;
            return newBook;
          }

          return oldBook;
        });

        if (!stateChanged) {
          this.books.push(newBook);
        }
      },
      async fetchAll() {
        this.isLoading = true;
        this.books = await booksApi.get();
        this.isLoading = false;
      },
      async create({ name, image }) {
        const loan = false;
        const userId = useAuth().userData?.id;
        const newBook = await booksApi.create({ name, image, userId, loan });
        this.updateOrPushBook(newBook);

        return newBook;
      },
      async update({ id, name, image, userId, loan }) {
        const book = await booksApi.update(id, {
          name,
          image,
          userId,
          loan,
        });
        this.updateOrPushBook(book);
      },
      async borrow(book) {
        const date = new Date().toISOString().slice(0, 10);
        const userId = useAuth().userData?.id as number;
        const loan = { date, userId };
        await this.update({ ...book, loan });
      },
      async return(book) {
        const loan = false;
        await this.update({ ...book, loan });
      },
      async delete(bookId) {
        await booksApi.destroy(bookId);
        this.books = this.books.filter(({ id }) => id !== bookId);
      },
    },
  },
);

export default useBookStore;
