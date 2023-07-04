import { createStore } from 'vuex';

import itemsList from './modules/itemsList';
import rotate from './modules/rotate';

const store = createStore({
  modules: {
    itemsList,
    rotate,
  },
});

export default store;
