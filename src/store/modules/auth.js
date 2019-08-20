import api from '@/services/api/users'

// Save default key to access local/session storage
const storageKey = 'user-data'

// Export module parts (state, getters, mutations & actions)
export default {

  state: {
    userData: undefined
  },

  getters: {
    userId: state => state.userData.id,
    userName: state => state.userData.name,
    userEmail: state => state.userData.email
  },

  mutations: {

    // Save credentials data to state
    authenticate(state, userData) {
      state.userData = {
        id: userData.id,
        name: userData.name,
        email: userData.email
      }
    },

    // Flush away credentials state
    destroySession(state) {
      state.userData = undefined
    }
  },

  actions: {

    // Checks if users is authenticated
    isAuthenticated({ commit }) {
      let userData = sessionStorage['user-data'] || localStorage['user-data']
      if (userData) {
        commit('authenticate', JSON.parse(userData))
      }
      return !!userData
    },

    // Submit credentials for loging in
    signIn({ commit }, credentials, keepConnection) {
      if (credentials.email && credentials.password) {
        api.get({ email: credentials.email })
          .then(response => {
            if (response.data.password === credentials.password) {
              const storage = keepConnection ? localStorage : sessionStorage
              storage[storageKey] = JSON.stringify({ id: user.id, email: user.email })
              commit('authenticate', response.data)
              return true
            }
          })
      }
      return false
    },

    // Submit credentials for signing up
    signUp({ commit }, credentials) {
      if (credentials.name && credentials.email && credentials.password) {
        return !!this.api.post(credentials)
      }
      return false
    },

    // Delete any records in session and local storage
    signOut({ commit }) {
      delete sessionStorage[storageKey]
      delete localStorage[storageKey]
      commit('destroySession')
    }
  }
}
