import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {

	groups: undefined,
	group: undefined,
	countGroups: undefined,
	areAllGroupsSelected: undefined,
	checkedGroups: [],
	responseAddGroup: '',
	dataToAddGroup: undefined,
	currentAnim: undefined,
	currentSkeleton: undefined,
	currentDefaultApp: undefined,
	filteredGroups: undefined,
	feedbackGroups: undefined,
	loadingActionGroups: false

};

const getters = {

	groups: state => state.groups,
	group: state => state.group,
	countGroups: state => state.countGroups,
	areAllGroupsSelected: state => state.areAllGroupsSelected,
	checkedGroups: state => state.checkedGroups,
	responseAddGroup: state => state.responseAddGroup,
	dataToAddGroup: state => state.dataToAddGroup,
	currentAnim: state => state.currentAnim,
	currentSkeleton: state => state.currentSkeleton,
	currentDefaultApp: state => state.currentDefaultApp,
	filteredGroups: state => state.filteredGroups,
	feedbackGroups: state => state.feedbackGroups,
	loadingActionGroups: state => state.loadingActionGroups

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

		store.commit('loadingActionGroups', true);
		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/DeleteGroup.json', payload.rowIdsData).then(response => {

			state.checkedGroups = [];
			store.dispatch('getGroups', payload.$http);
			store.commit('loadingActionGroups', false);

		});

	},
	addGroup: ({state, commit, rootState}, payload) => {

		let formData = new FormData();

		if (payload.data.rowid) {

			payload.data.dataSelect.history ? payload.data.dataSelect.history = 1 : payload.data.dataSelect.history = 0;
			payload.data.dataSelect.public_part ? payload.data.dataSelect.public_part = 1 : payload.data.dataSelect.public_part = 0;

			payload.data.dataGroupUsers.forEach((user) => {

				formData.append('users', user.ident);

			});

			payload.data.dataGroupTeams.forEach((team) => {

				formData.append('teams', team.ident);

			});

			payload.data.dataGroupApps.forEach((app) => {

				formData.append('applications', app.ident);

			});

			formData.append('anim_id', payload.data.dataSelect.user.rowid);
			formData.append('default_app', payload.data.dataSelect.default_app);
			formData.append('description', payload.data.dataInput.description);
			formData.append('ident', payload.data.dataInput.ident);
			formData.append('history', payload.data.dataSelect.history);
			formData.append('lang', payload.data.dataSelect.lang.ident);
			formData.append('public_part', payload.data.dataSelect.public_part);

			formData.append('rowid', payload.data.rowid);


			payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/SetGroup.json', formData).then((response) => {

				response.json().then((data) => {

					commit('isLoading');
					commit('feedbackGroups', 'Groupe modifié.');
					payload.$router.push({name: 'groups'});

				});

			});
			commit('isLoading');

		} else {

			payload.data.dataSelect.history ? payload.data.dataSelect.history = 1 : payload.data.dataSelect.history = 0;
			payload.data.dataSelect.public_part ? payload.data.dataSelect.public_part = 1 : payload.data.dataSelect.public_part = 0;

			payload.data.dataGroupUsers.forEach((user) => {

				formData.append('users', user.ident);

			});

			payload.data.dataGroupTeams.forEach((team) => {

				formData.append('teams', team.ident);

			});

			payload.data.dataGroupApps.forEach((app) => {

				formData.append('applications', app.ident);

			});

			console.log(payload.data.dataSelect.default_app);
			formData.append('anim_id', payload.data.dataSelect.user.rowid);
			formData.append('default_app', payload.data.dataSelect.default_app);
			formData.append('description', payload.data.dataInput.description);
			formData.append('ident', payload.data.dataInput.ident);
			formData.append('history', payload.data.dataSelect.history);
			formData.append('lang', payload.data.dataSelect.lang.ident);
			formData.append('public_part', payload.data.dataSelect.public_part);
			formData.append('skeleton', payload.data.dataSelect.skeletonFile.file);
			formData.append('users', payload.data.dataSelect.user.ident);

			payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/SetGroup.json', formData).then((response) => {

				response.json().then((data) => {

					commit('isLoading');
					commit('feedbackGroups', 'Groupe ajouté.');
					payload.$router.push({name: 'groups'});

				});

			});
			commit('isLoading');

		}

	},
	getDataToAddGroup: ({state, commit}, payload) => {

		let urlsData = {};
		let urlList = ['https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetLanguages.json',
			'https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetSkeletons.json?type=group',
			'https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetUsers.json'
		];

		return new Promise(function (resolve, reject) {

			urlList.forEach(function (url) {

				payload.$http.get(url).then((response) => {

					response.json().then((data) => {

						/Languages/.test(url) ? urlsData.languages = data.language
						: /Users/.test(url) ? urlsData.users = data.user
						: /Skeletons/.test(url) ? urlsData.skeletons = data.skeleton : console.log(' gneu gneu ');
						if (urlsData && urlsData.languages && urlsData.users && urlsData.skeletons) {

							commit('dataToAddGroup', urlsData);
							payload.store.dispatch('getDataSkeleton', {$http: payload.$http, file: urlsData.skeletons[0].file, lang: 'fr_FR'});

						}

					});

				});

			});

		});

	},

	getDataSkeleton: ({state, commit, rootState}, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetSkeletonDetails.json', {type: 'group', full_list: 1, lang: payload.lang, file: payload.file}).then((response) => {

			response.json().then((data) => {

				commit('currentSkeleton', data);

			});

		});

	},

	getFilteredGroups: ({state, commit, rootState}, payload) => {

		payload.ident === undefined ? payload.ident = '' : undefined;
		payload.animator === undefined ? payload.animator = '' : undefined;

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetGroups.json', {match: payload.match, ident: payload.ident, animator: payload.animator}).then(response => {

			commit('filteredGroups', response.body);

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

	},
	dataToAddGroup: (state, data) => {

		state.dataToAddGroup = data;

	},
	currentAnim: (state, user) => {

		state.currentAnim = user;

	},
	currentSkeleton: (state, skeleton) => {

		state.currentSkeleton = skeleton;

	},
	currentDefaultApp: (state, defaultApp) => {

		state.currentDefaultApp = defaultApp;

	},
	filteredGroups: (state, groups) => {

		if (groups) state.filteredGroups = groups.group;
		else state.filteredGroups = undefined;

	},
	feedbackGroups: (state, feedback) => {

		state.feedbackGroups = feedback;
		setTimeout(() => {

			state.feedbackGroups = undefined;

		}, 3000);

	},
	loadingActionGroups: (state, payload) => {

		state.loadingActionGroups = payload;

	}

};

export default {

	state,
	getters,
	actions,
	mutations

};
