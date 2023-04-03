const state = {
  angle: null,
};
const getters = {
  angle: (state) => state.angle,
};

const actions = {};

const mutations = {
  getAngle(state, angle) {
    state.angle = angle;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
