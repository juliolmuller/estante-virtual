import { usersApi } from '../../services/api'

const STORAGE_KEY = 'user-data'

export default {
  namespaced: 'auth',

  state: {
    userData: null,
  },

  getters: {
    isAuthenticated: (state) => Boolean(state.userData),
    userData: (state) => ({
      email: state.userData?.email,
      name: state.userData?.name,
      id: state.userData?.id,
    }),
  },

  mutations: {
    setUserData(state, userData = null) {
      state.userData = userData
    },
    setBrowserStorage(state, storage) {
      if (state.userData) {
        const dataAsString = JSON.stringify(state.userData)

        storage.setItem(STORAGE_KEY, dataAsString)
      } else {
        sessionStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(STORAGE_KEY)
      }
    },
  },

  actions: {
    async authenticate({ commit }, { email, password, keepConnection }) {
      const [userData] = await usersApi.get({ email, password })
      const storage = keepConnection ? localStorage : sessionStorage

      if (!userData) {
        return false
      }

      commit('setUserData', userData)
      commit('setBrowserStorage', storage)

      return true
    },
    retrieveFromStorage() {
      const savedAtLocal = localStorage.getItem(STORAGE_KEY)
      const savedAtSession = sessionStorage.getItem(STORAGE_KEY)
      const userData = JSON.parse(savedAtLocal || savedAtSession)
      const storage = savedAtLocal ? localStorage : sessionStorage

      return { userData, storage }
    },
    signOut({ commit }) {
      commit('setUserData')
      commit('setBrowserStorage')
    },
    async update({ dispatch }, { id, name, email, oldPassword, newPassword }) { // eslint-disable-line object-curly-newline
      const { storage } = await dispatch('retrieveFromStorage')
      const keepConnection = storage === localStorage
      const originalUser = await usersApi.getOne(id)
      const password = oldPassword === originalUser.password
        ? (newPassword || oldPassword)
        : originalUser.password
      const newUser = await usersApi.put({ id, name, email, password })

      await dispatch('authenticate', { ...newUser, keepConnection })
    },
  },
}
