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
    userById(state) {
      return (id) => {
        // eslint-disable-next-line no-shadow
        const user = state.users.find((user) => user.id === Number(id))

        return user && {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    },
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
