import { router } from '../../router/index';
const state = {
  routes: [],
  addRoutes: [],
};

const getters = {
  routes: (state) => state.sidebar.routes,
};

const actions = {};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = router.concat(routes);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
