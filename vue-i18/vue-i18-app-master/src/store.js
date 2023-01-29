import Vue from "vue";
import Vuex from "vuex";
import app from "./main";

Vue.use(Vuex);

export default new Vuex.store({
  mutations: {
    SET_LANG(state, payload) {
      app.$i18n.locale = payload;
    },
  },

  actions: {
    setLang({ commit }, payload) {
      commit("SET_LANG", payload);
    },
  },
});
