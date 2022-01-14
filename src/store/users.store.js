import { defineStore } from 'pinia'
import { usersApi } from '../services/api'

export const useUsers = defineStore('users', {
  state: () => ({
    isLoading: false,
    users: [],
  }),

  getters: {
    userById(state) {
      return (userId) => {
        const user = state.users.find(({ id }) => id === Number(userId))

        return user && {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    },
  },

  actions: {
    async fetchAll() {
      this.isLoading = true
      this.users = await usersApi.get()
      this.isLoading = false
    },
  },
})
