import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users.js';
import teams from './modules/teams.js';
import groups from './modules/groups.js';
import loading from './modules/loading.js';
import * as getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
	getters,
	modules: {
		users,
		teams,
		groups,
		loading
	}
});
