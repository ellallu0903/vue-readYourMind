import Vue from 'vue'
import Vuex from 'vuex'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      name: '',
      avator: '',
      authority: '',
      id: ''
    },
    sign: {
      email: ''
    }
  },
  mutations: {
    logout(state) {
      state.user.name = ''
      state.user.email = ''
      state.user.id = ''
      state.user.avator = ''
      state.user.authority = ''
    },
    login(state, data) {
      state.user.name = data.name
      state.user.email = data.email
      state.user.id = data._id
      state.user.avator = data.avator
      state.user.authority = data.authority
    },
    cleanEmail(state) {
      state.sign.email = ''
    }
  },
  actions: {},
  modules: {},
  plugins: [Persistedstate()]
})
