import { defineStore } from 'pinia'
import type { User } from '~/models'
import { usersApi } from '~/services/api'

const STORAGE_KEY = 'user-data'

export interface AUthStoreState {
  errors: string[]
  isLoading: boolean
  storage: Storage
  userData: User | null
}

export interface AUthStoreActions {
  recoverFromStorage: () => void
  signIn: (credentials: {
    email: string
    password: string
    rememberMe?: boolean
  }) => Promise<boolean>
  signUp: (authData: {
    name: string
    email: string
    password: string
    passwordRepeat: string
  }) => Promise<boolean>
  signOut: () => void
  updateUserData: (authData: {
    id: number
    name: string
    email: string
    oldPassword: string
    newPassword: string
  }) => Promise<void>
}

const useAuth = defineStore<'auth', AUthStoreState, any, AUthStoreActions>('auth', {
  state: () => ({
    errors: [],
    isLoading: false,
    storage: sessionStorage,
    userData: null,
  }),

  getters: {
    isAuthenticated: (state: AUthStoreState) => Boolean(state.userData?.id),
  },

  actions: {
    recoverFromStorage() {
      const userDataFromLocal = localStorage.getItem(STORAGE_KEY) as string
      const userDataFromSession = sessionStorage.getItem(STORAGE_KEY) as string
      this.userData = JSON.parse(userDataFromLocal || userDataFromSession)
      this.storage = userDataFromLocal ? localStorage : sessionStorage
    },
    async signIn({ email, password, rememberMe = false }) {
      this.storage = rememberMe ? localStorage : sessionStorage
      this.isLoading = true
      this.errors = []

      try {
        const [userData] = await usersApi.get({ email, password })

        if (!userData) {
          throw new Error('Email e senha inválidos')
        }

        this.userData = userData
        this.storage.setItem(STORAGE_KEY, JSON.stringify(this.userData))
        return true
      } catch (error: any) {
        console.error(error) // eslint-disable-line no-console
        this.errors = [error.message]
        return false
      } finally {
        this.isLoading = false
      }
    },
    async signUp({ name, email, password, passwordRepeat }) {
      this.isLoading = true
      this.errors = []

      try {
        const [userData] = await usersApi.get({ email })

        if (userData) {
          throw new Error('Email já cadastrado')
        }

        /* eslint-disable curly */
        if (!name?.trim()) this.errors.push('Nome é obrigatório')
        if (!email?.trim()) this.errors.push('Email é obrigatório')
        if (!password?.trim()) this.errors.push('Senha é obrigatória')
        if (password !== passwordRepeat) this.errors.push('Senhas não conferem')
        /* eslint-enable curly */

        if (this.errors.length > 0) {
          return false
        }

        await usersApi.create({ name, email, password })
        return await this.signIn({ email, password })
      } catch (error: any) {
        console.error(error) // eslint-disable-line no-console
        this.errors = [error.message]
        return false
      } finally {
        this.isLoading = false
      }
    },
    signOut() {
      this.$reset()
      localStorage.removeItem(STORAGE_KEY)
      sessionStorage.removeItem(STORAGE_KEY)
    },
    async updateUserData({ id, name, email, oldPassword, newPassword }) {
      const originalUser = await usersApi.find(id)
      const password = oldPassword === originalUser?.password
        ? (newPassword || oldPassword)
        : originalUser?.password
      this.userData = await usersApi.update(id, { name, email, password })
      this.storage.setItem(STORAGE_KEY, JSON.stringify(this.userData))
    },
  },
})

export default useAuth
