import type { Book, User } from '~/models'
import ApiConsumer from './ApiConsumer'

export const booksApi = new ApiConsumer<Book>('books')
export const usersApi = new ApiConsumer<User>('users')
