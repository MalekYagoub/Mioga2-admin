import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users.js';
import * as getters from './getters';
;
Vue.use(Vuex);

export default new Vuex.Store({
	getters,
	modules: {
		users
	}
});
