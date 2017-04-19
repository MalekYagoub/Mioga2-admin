import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {

	groups: undefined,
	group: undefined,
	countGroups: undefined,
	areAllGroupsSelected: undefined,
	checkedGroups: [],
	responseAddGroup: ''

};

const getters = {

	groups: state => state.groups,
	group: state => state.group,
	countGroups: state => state.countGroups,
	areAllGroupsSelected: state => state.areAllGroupsSelected,
	checkedGroups: state => state.checkedGroups,
	responseAddGroup: state => state.responseAddGroup

};

const actions = {

	getGroups: ({state, commit, rootState}, $http) => {

		return new Promise(function (resolve, reject) {

			$http.get('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetGroups.json').then((response) => {

				response.json().then((data) => {

					commit('groups', data.group);
					resolve(state.groups);
					commit('countGroups', data.group);

				});

			});

		});

	},
	getGroup: ({state, commit, rootState}, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetGroupDetails.json', {rowid: payload.rowid, full_list: 1}).then((response) => {

			response.json().then((data) => {

				commit('group', data);
				payload.$router.push({name: 'modifyGroup'});

			});

		});

	},
	destroyGroups: (store, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/DeleteGroup.json', payload.rowIdsData).then(response => {

			state.checkedGroups = [];
			store.dispatch('getGroups', payload.$http);

		});

	}

};

const mutations = {

	groups: (state, groups) => {

		state.groups = groups;

	},
	group: (state, group) => {

		state.group = group;

	},
	countGroups: (state, groups) => {

		state.countGroups = groups.length;

	},
	areAllGroupsSelectedTrue: (state) => {

		state.areAllGroupsSelected = true;

	},
	areAllGroupsSelectedFalse: (state) => {

		state.areAllGroupsSelected = false;

	},
	checkGroups: (state) => {

		if (state.checkedGroups.length === 0 || state.checkedGroups.length < state.countGroups) {

			state.groups.forEach(function (user) {

				if (state.checkedGroups.indexOf(user.rowid) === -1) state.checkedGroups.push(user.rowid);

			});

		} else {

			state.checkedGroups = [];

		}

	},
	pushCheckGroup: (state, groupsToCheck) => {

		state.checkedGroups.push(groupsToCheck);

	},
	removeCheckedGroup: (state, groupsToRemove) => {

		let index = state.checkedGroups.indexOf(groupsToRemove);
		state.checkedGroups.splice(index, 1);

	},
	responseAddGroup: (state, response) => {

		state.responseAddGroup = response;

	}

};

export default {

	state,
	getters,
	actions,
	mutations

};
