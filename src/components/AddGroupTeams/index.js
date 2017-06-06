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

		if (this.group) {

			let _teamsIn = [];
			let _teamsOut = [];

			this.groupToModify = JSON.parse(JSON.stringify(this.group));
			this.teamsOut = this.groupToModify.teams.team;
			this.teamsOut.forEach((team) => {

				if (team.selected) {

					_teamsIn.push(team);

				} else _teamsOut.push(team);

			});

			this.teamsIn = _teamsIn;
			this.teamsOut = _teamsOut;
			this.$emit('groupTeams', this.teamsIn);

		}

		/* if (this.dataToAddGroup) {

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

		currentSkeleton (value) {

			if (!this.groupToModify) {

				let skeleton = JSON.parse(JSON.stringify(value));
				this.teamsOut = skeleton.teams.team;
				this.teamsIn = [];
				skeleton.teams.team.forEach((team) => {

					if (team.selected) this.addGroupTeams(team);

				});
				this.$emit('groupTeams', this.teamsIn);

			}

		}
	}

});
