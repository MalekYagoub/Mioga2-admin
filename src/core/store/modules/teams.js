import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {

	teams: undefined,
	team: undefined,
	countTeams: undefined,
	areAllTeamsSelected: undefined,
	checkedTeams: [],
	responseAddTeam: '',
	filteredTeams: undefined

};

const getters = {

	teams: state => state.teams,
	team: state => state.team,
	countTeams: state => state.countTeams,
	areAllTeamsSelected: state => state.areAllTeamsSelected,
	checkedTeams: state => state.checkedTeams,
	responseAddTeam: state => state.responseAddTeam,
	filteredTeams: state => state.filteredTeams

};

const actions = {

	getTeams: ({state, commit, rootState}, $http) => {

		$http.get('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetTeams.json').then((response) => {

			response.json().then((data) => {

				commit('teams', data.team);
				commit('countTeams', data.team);

			});

		});

	},
	getTeam: ({state, commit, rootState}, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetTeamDetails.json', {rowid: payload.rowid, full_list: 1}).then((response) => {

			response.json().then((data) => {

				commit('team', data);
				payload.$router.push({name: 'modifyTeam'});

			});

		});

	},
	destroyTeams: (store, payload) => {

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/DeleteTeam.json', payload.rowIdsData).then(response => {

			state.checkedTeams = [];
			store.dispatch('getTeams', payload.$http);

		});

	},
	addTeam: ({state, commit, rootState}, payload) => {

		let formData = new FormData();

		formData.append('description', payload.data.dataInput.description);
		formData.append('ident', payload.data.dataInput.ident);
		if (payload.data.rowid) formData.append('rowid', payload.data.rowid);

		payload.data.dataTeamUsers.forEach((user) => {

			formData.append('users', user.ident);

		});

		payload.data.dataTeamGroups.forEach((group) => {

			formData.append('groups', group.ident);

		});

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/SetTeam.json', formData).then(response => {

			if (response.body.journal && response.body.journal[0] && /erreur/i.test(response.body.journal[0].step)) commit('responseAddTeam', response.body.journal[0].step);
			else {

				commit('isLoading');
				payload.$router.push({name: 'teams'});
				commit('responseAddTeam', undefined);

			}

		});
		commit('isLoading');

	},
	getFilteredTeams: ({state, commit, rootState}, payload) => {

		payload.ident === undefined ? payload.ident = '' : undefined;

		payload.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetTeams.json', {match: payload.match, ident: payload.ident}).then(response => {

			commit('filteredTeams', response.body);

		});

	}
};

const mutations = {

	teams: (state, teams) => {

		state.teams = teams;

	},
	team: (state, team) => {

		state.team = team;

	},
	countTeams: (state, teams) => {

		state.countTeams = teams.length;

	},
	areAllTeamsSelectedTrue: (state) => {

		state.areAllTeamsSelected = true;

	},
	areAllTeamsSelectedFalse: (state) => {

		state.areAllTeamsSelected = false;

	},
	checkTeams: (state) => {

		if (state.checkedTeams.length === 0 || state.checkedTeams.length < state.countTeams) {

			state.teams.forEach(function (user) {

				if (state.checkedTeams.indexOf(user.rowid) === -1) state.checkedTeams.push(user.rowid);

			});

		} else {

			state.checkedTeams = [];

		}

	},
	pushCheckTeam: (state, teamsToCheck) => {

		state.checkedTeams.push(teamsToCheck);

	},
	removeCheckedTeam: (state, teamsToRemove) => {

		let index = state.checkedTeams.indexOf(teamsToRemove);
		state.checkedTeams.splice(index, 1);

	},
	responseAddTeam: (state, response) => {

		state.responseAddTeam = response;

	},
	filteredTeams: (state, teams) => {

		if (teams) state.filteredTeams = teams.team;
		else state.filteredTeams = undefined;

	}

};

export default {

	state,
	getters,
	actions,
	mutations

};
