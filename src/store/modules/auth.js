import { usersApi } from '../../services/api'

const STORAGE_KEY = 'user-data'

const sanitizeData = (userData) => ({
  id: userData.id,
  name: userData.name,
  email: userData.email,
})

export default {

  state: {
    userData: {},
  },

  getters: {
    userId: (state) => state.userData.id,
    userName: (state) => state.userData.name,
    userEmail: (state) => state.userData.email,
    userData: (state) => ({
      id: state.userData.id,
      name: state.userData.name,
      email: state.userData.name,
    }),
  },

  mutations: {
    authenticate(state, userData) {
      state.userData = userData
      return userData
    },
    destroySession(state) {
      state.userData = {}
    },
  },

  actions: {
    isAuthenticated({ commit }) {
      const userData = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY)

      if (userData) {
        commit('authenticate', JSON.parse(userData))
      }

      return Boolean(userData)
    },
    signIn({ commit }, credentials, keepConnection) {
      const userData = sanitizeData(credentials)
      const storage = keepConnection ? localStorage : sessionStorage

      storage.setItem(STORAGE_KEY, JSON.stringify(userData))
      commit('authenticate', userData)
    },
    async signUp({ commit }, credentials) {
      const userData = sanitizeData(await usersApi.post(credentials))

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      commit('authenticate', userData)
    },
    async update({ commit }, credentials) {
      const { id, name, email, newPassword: password } = credentials
      const userData = { id, name, email, password }

      commit('authenticate', await usersApi.put(userData))
    },
    signOut({ commit }) {
      sessionStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_KEY)

      commit('destroySession')
    },
  },
}
