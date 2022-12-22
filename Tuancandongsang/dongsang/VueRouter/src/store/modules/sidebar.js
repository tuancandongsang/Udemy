import { router } from '../../router/index';
const state = {
  router: [],
  hindenSibebar: true,
};

const getters = {
  router: (state) => state.router,
  hindenSibebar: (state) => state.hindenSibebar,
};

const actions = {};

const mutations = {
  SET_ROUTES: (state) => {
    state.router = router;
  },
  TONGGLE_HINDEN:(state, hinden) =>{
    state.hindenSibebar = !hinden;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
