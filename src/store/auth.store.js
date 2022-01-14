import { defineStore } from 'pinia'
import { usersApi } from '../services/api'

const STORAGE_KEY = 'user-data'

export const useAuth = defineStore('auth', {
  state: () => ({
    errors: [],
    isLoading: false,
    storage: sessionStorage,
    userData: {
      id: undefined,
      name: undefined,
      email: undefined,
    },
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.userData.id),
  },

  actions: {
    recoverFromStorage() {
      const userDataFromLocal = localStorage.getItem(STORAGE_KEY)
      const userDataFromSession = sessionStorage.getItem(STORAGE_KEY)
      this.storage = userDataFromLocal ? localStorage : sessionStorage
      this.userData = JSON.parse(userDataFromLocal || userDataFromSession)
    },
    async signIn(email, password, rememberMe = false) {
      this.storage = rememberMe ? localStorage : sessionStorage
      this.isLoading = true
      this.errors = []

      try {
        const [userData] = await usersApi.get({ email, password })

        if (!userData) { throw new Error('Email e senha inválidos') }

        this.storage.setItem(STORAGE_KEY, JSON.stringify(this.userData))
        this.userData = userData
        return true
      } catch (error) {
        console.error(error) // eslint-disable-line no-console
        this.errors = [error.message]
        return false
      } finally {
        this.isLoading = false
      }
    },
    async signUp(name, email, password, passwordRepeat) {
      this.isLoading = true
      this.errors = []

      try {
        const [userData] = await usersApi.get({ email })

        if (userData) { throw new Error('Email e senha inválidos') }

        /* eslint-disable curly */
        if (!name?.trim()) this.errors.push('Nome é obrigatório')
        if (!email?.trim()) this.errors.push('Email é obrigatório')
        if (!password?.trim()) this.errors.push('Senha é obrigatória')
        if (password !== passwordRepeat) this.errors.push('Senhas não conferem')
        /* eslint-enable curly */

        if (this.errors.length > 0) {
          return false
        }

        await usersApi.post({ name, email, password })
        return await this.signIn(email, password)
      } catch (error) {
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
      const originalUser = await usersApi.getOne(id)
      const password = oldPassword === originalUser.password
        ? (newPassword || oldPassword)
        : originalUser.password
      this.userData = await usersApi.put({ id, name, email, password })
      this.storage.setItem(STORAGE_KEY, JSON.stringify(this.userData))
    },
  },
})
