import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {

	isLoading: false

};

const getters = {

	isLoading: state => state.isLoading

};

const actions = {

};

const mutations = {

	isLoading: (state) => {

		state.isLoading = !state.isLoading;

	}

};

export default {

	state,
	getters,
	actions,
	mutations

};
