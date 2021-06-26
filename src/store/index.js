import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const USER_KEY = 'USER'

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem(USER_KEY) || null)
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem(USER_KEY, payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
