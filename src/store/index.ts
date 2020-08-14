import Vue from 'vue';
import Vuex from 'vuex';
import { setLocal, getLocal } from '@/utils/local';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: getLocal('user'),
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      setLocal('user', payload);
    },
  },
  actions: {
  },
  modules: {
  },
});
