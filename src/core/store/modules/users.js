import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {

	users: undefined,
	allUsers: undefined,
	countUsers: undefined,
	areAllUsersSelected: undefined,
	checkedUsers: [],
	user: undefined,
	passPolicy: undefined,
	error: undefined,
	userStatuses: undefined,
	filteredUsers: undefined

};

const getters = {

	users: state => state.users,
	allUsers: state => state.allUsers,
	user: state => state.user,
	countUsers: state => state.countUsers,
	areAllUsersSelected: state => state.areAllUsersSelected,
	checkedUsers: state => state.checkedUsers,
	passPolicy: state => state.passPolicy,
	error: state => state.error,
	userStatuses: state => state.userStatuses,
	filteredUsers: state => state.filteredUsers

};

const actions = {

	getUsers: ({state, commit, rootState}, payload) => {

		if (!payload.type) {

			payload.$http.get('https://bureaulib.extranet.alixen.fr/BureauLib//bin/Administrateurs/Bottin/GetUserData').then((response) => {

				response.json().then((data) => {

					console.log(data.items);
					commit('users', data.items);
					commit('countUsers', data.items);

				});

			});

		} else if (payload.type === 'all') {

			return new Promise(function (resolve, reject) {

				payload.$http.get('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetUsers.json').then((response) => {

					response.json().then((data) => {

						commit('allUsers', data.user);
						resolve(state.allUsers);

					});

				});

			});

		}

	},
	getUser: ({state, commit, rootState}, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib//bin/Administrateurs/Bottin/GetUser.json', {rowid: payload.rowid}).then((response) => {

			response.json().then((data) => {

				commit('user', data.user);
				payload.$router.push({name: 'modifyUser'});

			});

		});

	},
	setUser: ({store, state, commit, rootState}, payload) => {

		if (!payload.user.rowid) { // add user

			payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib//bin/Administrateurs/Bottin/SetUser.json',
			{description: payload.user.description, email: payload.user.email, firstname: payload.user.firstname, lastname: payload.user.lastname, ident: payload.user.ident}).then(response => {

				if (response.body.errors[0]) commit('error', response.body.errors[0][0]);
				else {

					commit('isLoading');
					payload.$router.push({name: 'users'});

				}

			});
			commit('isLoading');

		} else { // modify user

			payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib//bin/Administrateurs/Bottin/SetUser.json',
			{description: payload.user.description, email: payload.user.email, firstname: payload.user.firstname, lastname: payload.user.lastname, ident: payload.user.ident, rowid: payload.user.rowid}).then(response => {

				if (response.body.errors[0]) commit('error', response.body.errors[0][0]);
				else {

					commit('user');
					commit('isLoading');
					payload.$router.push({name: 'users'});

				}

			});
			commit('isLoading');

		}


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
			store.dispatch('getUsers', {$http: payload.$http});

		});

	},
	emailUsers: (state, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Bottin/EmailUsers', payload.rowidsData).then(response => {
		});

	},
	disableUsers: (store, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Bottin/DisableUsers', payload.rowIdsData).then(response => {

			state.checkedUsers = [];
			store.dispatch('getUsers', {$http: payload.$http});

		});

	},
	enableUsers: (store, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Bottin/EnableUsers', payload.rowIdsData).then(response => {

			state.checkedUsers = [];
			store.dispatch('getUsers', {$http: payload.$http});

		});

	},

	getPassPolicy: ({state, commit, rootState}, payload) => {

		payload.$http.get('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetPasswordPolicy.json').then(response => {

			commit('passPolicy', response.body);

		});

	},

	setPassPolicy: ({state, commit, rootState}, payload) => {

		payload.use_secret_question ? payload.use_secret_question = 1 : payload.use_secret_question = 0;

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/SetPasswordPolicy.json', {pwd_min_chcase: payload.pwd_min_chcase, pwd_min_digit: payload.pwd_min_digit, pwd_min_length: payload.pwd_min_length, pwd_min_letter: payload.pwd_min_letter, pwd_min_special: payload.pwd_min_special, use_secret_question: payload.use_secret_question}).then(response => {

			payload.$router.push({name: 'users'});

		});

	},

	getUserStatuses: ({state, commit, rootState}, payload) => {

		payload.$http.get('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Bottin/GetUserStatuses.json').then(response => {

			commit('userStatuses', response.body.status);

		});

	},

	getFilteredUsers: ({state, commit, rootState}, payload) => {

		payload.firstname === undefined ? payload.firstname = '' : undefined;
		payload.lastname === undefined ? payload.lastname = '' : undefined;
		payload.email === undefined ? payload.email = '' : undefined;
		payload.status === undefined ? payload.status = '' : undefined;

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Bottin/GetUserData', {match: payload.match, firstname: payload.firstname, lastname: payload.lastname, email: payload.email, status: payload.status}).then(response => {

			commit('filteredUsers', response.body);

		});

	}

};

const mutations = {

	users: (state, users) => {

		state.users = users;

	},
	user: (state, user) => {

		if (user) state.user = user;
		else state.user = undefined;

	},
	allUsers: (state, users) => {

		state.allUsers = users;

	},
	countUsers: (state, users) => {

		state.countUsers = users.length;

	},
	areAllSelectedTrue: (state) => {

		state.areAllUsersSelected = true;

	},
	areAllSelectedFalse: (state) => {

		state.areAllUsersSelected = false;

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

	},
	passPolicy: (state, policy) => {

		state.passPolicy = policy;

	},
	error: (state, error) => {

		state.error = error;

	},
	userStatuses: (state, statuses) => {

		state.userStatuses = statuses;

	},
	filteredUsers: (state, users) => {

		if (users) state.filteredUsers = users.items;
		else state.filteredUsers = undefined;

	}

};

export default {

	state,
	getters,
	actions,
	mutations

};
