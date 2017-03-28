import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {

	users: undefined,
	countUsers: undefined,
	areAllSelected: undefined,
	checkedUsers: []

};

const getters = {

	users: state => state.users,
	countUsers: state => state.countUsers,
	areAllSelected: state => state.areAllSelected,
	checkedUsers: state => state.checkedUsers

};

const actions = {

	getUsers: ({state, commit, rootState}, $http) => {

		$http.get('https://bureaulib.extranet.alixen.fr/BureauLib//bin/Administrateurs/Bottin/GetUserData').then((response) => {

			response.json().then((data) => {

				commit('users', data.items);
				commit('countUsers', data.items);

			});

		}, (response) => {
		});

	},
	addUser: (state, description, email, firstname, lastname, password, password2, ident) => {

		return description;

	},
	downloadCsv: (state, $http) => {

		$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Bottin/ExportUsers').then(response => {

			let link = document.createElement('a');
			link.setAttribute('href', encodeURI('data:text/csv;charset=utf-8,' + response.body));
			link.setAttribute('download', 'mioga-users.csv');
			link.click();

		});

	},
	destroyUsers: (store, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Bottin/DeleteUser', payload.rowIdsData).then(response => {

			state.checkedUsers = [];
			store.dispatch('getUsers', payload.$http);

		});

	},
	emailUsers: (state, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Bottin/EmailUsers', payload.rowidsData).then(response => {
		});

	},
	disableUsers: (store, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Bottin/DisableUsers', payload.rowIdsData).then(response => {

			state.checkedUsers = [];
			store.dispatch('getUsers', payload.$http);

		});

	},
	enableUsers: (store, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Bottin/EnableUsers', payload.rowIdsData).then(response => {

			state.checkedUsers = [];
			store.dispatch('getUsers', payload.$http);

		});

	}

};

const mutations = {

	users: (state, users) => {

		state.users = users;

	},
	countUsers: (state, users) => {

		state.countUsers = users.length;

	},
	areAllSelectedTrue: (state) => {

		state.areAllSelected = true;

	},
	areAllSelectedFalse: (state) => {

		state.areAllSelected = false;

	},
	checkUsers: (state) => {

		if (state.checkedUsers.length === 0 || state.checkedUsers.length < state.countUsers) {

			state.users.forEach(function (user) {

				if (state.checkedUsers.indexOf(user.rowid) === -1) state.checkedUsers.push(user.rowid);

			});

		} else {

			state.checkedUsers = [];

		}

	},
	pushCheckUser: (state, userToCheck) => {

		state.checkedUsers.push(userToCheck);

	},
	removeCheckedUser: (state, userToRemove) => {

		let index = state.checkedUsers.indexOf(userToRemove);
		state.checkedUsers.splice(index, 1);

	}

};

export default {

	state,
	getters,
	actions,
	mutations

};
