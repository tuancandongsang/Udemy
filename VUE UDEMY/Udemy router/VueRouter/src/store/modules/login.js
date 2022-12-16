const state = {
	login: {
		login: true
	}
}

const getters = {
	login: state => state.login.login
}

const actions = {}

const mutations = {
	TOGGLE_LOGIN(state) {
		state.login.login = !state.login.login
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
