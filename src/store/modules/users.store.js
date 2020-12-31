import { usersApi } from '../../services/api'

export default {
  namespaced: 'users',

  state: {
    isFetching: false,
    users: [],
  },

  getters: {
    isFetching: (state) => state.isFetching,
    allUsers: (state) => state.users,
    userById: (state) => (id) => state.users.find((user) => user.id === id),
  },

  mutations: {
    setFetching(state, fetchingStatus) {
      state.isFetching = fetchingStatus
    },
    toggleFetching(state) {
      state.isFetching = !state.isFetching
    },
    setUsers(state, users) {
      state.users = users
    },
  },

  actions: {
    async fetchAll({ commit }) {
      commit('setFetching', true)
      commit('setUsers', await usersApi.get())
      commit('setFetching', false)
    },
  },
}
