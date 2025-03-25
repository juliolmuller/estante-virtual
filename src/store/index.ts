import { createPinia } from 'pinia';

export default createPinia();

export { default as useAuth } from './auth.store';
export { default as useBookStore } from './books.store';
export { default as useUserStore } from './users.store';
