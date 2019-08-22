import api from '@/services/api/users'
import hash from '@/services/Hash'

// Save default key to access local/session storage
const storageKey = 'user-data'

// COmpose data to be stored in the client
const sanitizeData = (userData) => {
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    hash: hash(userData) }
}

// Export module parts (state, getters, mutations & actions)
export default {

  /**
   * List of stored states
   */
  state: {
    userData: {}
  },

  /**
   * List of exposed data
   */
  getters: {
    userId: state => state.userData.id,
    userName: state => state.userData.name,
    userEmail: state => state.userData.email,
    userData: state => {
      const { id, name, email } = state.userData
      return { id, name, email }
    }
  },

  /**
   * Methods to mutate stored states
   */
  mutations: {

    // Save credentials data to state
    authenticate(state, userData) {
      return state.userData = userData
    },

    // Flush away credentials state
    destroySession(state) {
      state.userData = {}
    }
  },

  /**
   * Methods to manipulate stored states
   */
  actions: {

    // Checks if users is authenticated
    isAuthenticated({ commit }) {
      const userData = sessionStorage['user-data'] || localStorage['user-data']
      if (userData) {
        commit('authenticate', JSON.parse(userData))
      }
      return !!userData
    },

    // Submit credentials for loging in
    signIn({ commit }, credentials, keepConnection) {
      const userData = sanitizeData(credentials)
      const storage = keepConnection ? localStorage : sessionStorage
      storage[storageKey] = JSON.stringify(userData)
      commit('authenticate', userData)
    },

    // Submit credentials for signing up
    signUp({ commit }, credentials) {
      api.post(credentials)
        .then(response => {
          const userData = sanitizeData(response.data)
          sessionStorage[storageKey] = JSON.stringify(userData)
          commit('authenticate', userData)
        })
    },

    // Update user data
    update({ commit }, credentials) {
      const { id, name, email } = credentials
      const userData = { id, name, email }
      if (credentials.newPassword) {
        userData.password = credentials.newPassword
      }
      api.put(userData)
        .then((response) => commit('authenticate', response.data))
    },

    // Delete any records in session and local storage
    signOut({ commit }) {
      delete sessionStorage[storageKey]
      delete localStorage[storageKey]
      commit('destroySession')
    }
  }
}
