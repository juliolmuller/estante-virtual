import { defineStore } from 'pinia'
import type { User } from '~/models'
import { usersApi } from '~/services/api'

export interface UserStoreState {
  isLoading: boolean
  users: User[]
}

export interface UserStoreActions {
  fetchAll: () => void
}

const useUserStore = defineStore<'users', UserStoreState, any, UserStoreActions>('users', {
  state: () => ({
    isLoading: true,
    users: [],
  }),

  getters: {
    userById(state: UserStoreState) {
      return (userId: User['id']): User | undefined => {
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

export default useUserStore
