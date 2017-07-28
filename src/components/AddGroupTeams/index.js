'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			teamsIn: [],
			teamsOut: [],
			allTeamsInOut: [],
			query: ''

		};

	},
	mounted () {

		if (this.group) {

			let _teamsIn = [];
			let _teamsOut = [];

			this.groupToModify = JSON.parse(JSON.stringify(this.group));
			this.teamsOut = this.groupToModify.teams.team;
			this.allTeamsInOut = JSON.parse(JSON.stringify(this.groupToModify.teams.team));
			this.teamsOut.forEach((team) => {

				if (team.selected) {

					_teamsIn.push(team);

				} else _teamsOut.push(team);

			});

			this.teamsIn = _teamsIn;
			this.teamsOut = _teamsOut;
			this.$emit('groupTeams', this.teamsIn);

		}

		/* if (this.dataToAddGroup && !this.group) {

			let skeleton = JSON.parse(JSON.stringify(this.currentSkeleton));
			this.teamsOut = skeleton.teams.team;
			this.teamsIn = [];
			skeleton.teams.team.forEach((team) => {

				if (team.selected) this.addGroupTeams(team);

			});
			this.$emit('groupTeams', this.teamsIn);

		} */

	},

	computed: {

		...mapGetters({

			dataToAddGroup: 'dataToAddGroup',
			currentSkeleton: 'currentSkeleton',
			group: 'group'

		}),
		filteredList: function () {

			this.allTeamsInOut.sort((teamA, teamB) => { // tri alphabétique

				let identA = teamA.ident.toLowerCase();
				let identB = teamB.ident.toLowerCase();
				if (identA < identB) return -1;
				else if (identA > identB) return 1;
				else return 0;

			});

			let vm = this;
			return this.allTeamsInOut.filter(function (team) {

				return team.ident.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;

			});

		}

	},

	methods: {

		addGroupTeams (team) {

			let index;
			this.teamsOut.forEach((teamOut) => {

				if (teamOut.rowid === team.rowid) index = this.teamsOut.indexOf(teamOut);

			});

			this.teamsIn.push(team);
			this.teamsOut.splice(index, 1);
			this.$emit('groupTeams', this.teamsIn);

		},
		removeGroupTeams (team) {

			let index;
			this.teamsIn.forEach((teamIn) => {

				if (teamIn.rowid === team.rowid) index = this.teamsIn.indexOf(teamIn);

			});

			this.teamsOut.unshift(team);
			this.teamsIn.splice(index, 1);
			this.$emit('groupTeams', this.teamsIn);

		},
		detectTeam (team) {

			let teamIsOut;
			for (let i = 0; i < this.teamsOut.length; i++) {

				if (this.teamsOut[i].rowid === team.rowid) { // si la team est dehors

					teamIsOut = true;
					break;

				}

			}

			if (teamIsOut) return 0; // dehors
			else return 1; // dedans

		}

	},
	watch: {

		currentSkeleton (value) {

			if (!this.groupToModify) {

				let skeleton = JSON.parse(JSON.stringify(value));
				this.teamsOut = skeleton.teams.team;
				this.allTeamsInOut = JSON.parse(JSON.stringify(skeleton.teams.team));
				this.allTeams = skeleton.teams.team;
				this.teamsIn = [];
				skeleton.teams.team.forEach((team) => {

					if (team.selected) this.addGroupTeams(team);

				});
				this.$emit('groupTeams', this.teamsIn);

			}

		}
	}

});
