
import { createStore } from 'vuex';

import login from './modules/login'
import todos from './modules/todos'

const store = createStore({
	modules: {
		login,
		todos
	}
})

export default store
