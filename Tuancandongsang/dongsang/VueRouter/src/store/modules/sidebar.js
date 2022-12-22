import { router } from '../../router/index';
const state = {
  router: [],
  state: {
    collapsed: false,
    selectedKeys: ['1'],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
    theme: 'dark',
  },
};

const getters = {
  router: (state) => state.router,
  state: (state) => state.state,
};

const actions = {};

const mutations = {
  SET_ROUTES: (state) => {
    state.router = router;
  },
  // HANDLE_SIDEBAR:(state, hinden) =>{
  //   state.hindenSibebar = !hinden;
  // }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
