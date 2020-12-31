import { usersApi } from '../../services/api'

const STORAGE_KEY = 'user-data'

export default {
  namespaced: 'auth',

  state: {
    userData: null,
  },

  getters: {
    isAuthenticated: (state) => Boolean(state.userData),
    userData: (state) => state.userData({
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
    retrieveFromStorage(state) {
      const savedAtLocal = localStorage.getItem(STORAGE_KEY)
      const savedAtSession = sessionStorage.getItem(STORAGE_KEY)
      const parsedData = JSON.parse(savedAtLocal || savedAtSession)

      state.userData = parsedData
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
    signOut({ commit }) {
      commit('setUserData')
      commit('setBrowserStorage')
    },
    async update({ commit }, credentials) {
      const { id, name, email, newPassword: password } = credentials
      const userData = { id, name, email, password }

      commit('setUserData', await usersApi.put(userData))
    },
  },
}
