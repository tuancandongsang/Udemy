import { createStore } from 'vuex';

import sidebar from './modules/sidebar';
import todos from './modules/todos';

const store = createStore({
  modules: {
    sidebar,
    todos,
  },
});

export default store;
