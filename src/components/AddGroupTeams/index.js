'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			teamsIn: [],
			teamsOut: []

		};

	},
	mounted () {
	},

	computed: {

		...mapGetters({

			dataToAddGroup: 'dataToAddGroup',
			currentSkeleton: 'currentSkeleton'

		})

	},

	methods: {

		addGroupTeams (team) {

			let index = this.teamsOut.indexOf(team);
			this.teamsIn.push(team);
			this.teamsOut.splice(index, 1);
			this.$emit('groupTeams', this.teamsIn);

		},
		removeGroupTeams (team) {

			let index = this.teamsIn.indexOf(team);
			this.teamsOut.unshift(team);
			this.teamsIn.splice(index, 1);
			this.$emit('groupTeams', this.teamsIn);

		}

	},
	watch: {

		dataToAddGroup (value) {

			// this.teamsOut = JSON.parse(JSON.stringify(value.skeleton.teams.team));
			// this.addGroupTeams(this.teamsOut.find(g => g.rowid === 1 && g.ident === 'Tous'));

		},

		currentSkeleton (value) {

			let skeleton = JSON.parse(JSON.stringify(value));
			this.teamsOut = skeleton.teams.team;
			this.teamsIn = [];
			skeleton.teams.team.forEach((team) => {

				if (team.selected) this.addGroupTeams(team);

			});
			this.$emit('groupTeams', this.teamsIn);

		}
	}

});
