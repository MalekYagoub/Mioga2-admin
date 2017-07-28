'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {
			isFilterMenuOn: false,
			filterChoices: {
				match: 'begins'
			}
		};

	},

	created () {},

	mounted () {

		this.$store.dispatch('getTeams', this.$http);

	},

	methods: {

		selectAllTeams () {

			this.$store.commit('checkTeams');

		},
		checkTeam (rowid) {

			if (this.checkedTeams.indexOf(rowid) === -1) this.$store.commit('pushCheckTeam', rowid);
			else this.$store.commit('removeCheckedTeam', rowid);

		},
		detailsTeam (rowid) {

			this.$store.dispatch('getTeam', {$http: this.$http, rowid: rowid, $router: this.$router});

		},
		submit () {

			this.$store.dispatch('getFilteredTeams', {$http: this.$http, match: this.filterChoices.match, ident: this.filterChoices.ident});
			this.isFilterMenuOn = false;

		},
		destroyFilter () {

			this.$store.commit('filteredTeams');
			this.filterChoices = {
				match: 'begins'
			};
			this.isFilterMenuOn = false;

		},
		dispatchAction (action) {

			if (this.checkedTeams.length > 0) {

				let rowIdsData = this.$store.getters.getRowIdsData('teams');
				let payload = { rowIdsData: rowIdsData, $http: this.$http };
				this.$store.dispatch(action, payload);

			}

		}

	},

	computed: {

		...mapGetters({

			teams: 'teams',
			countTeams: 'countTeams',
			areAllTeamsSelected: 'areAllTeamsSelected',
			checkedTeams: 'checkedTeams',
			filteredTeams: 'filteredTeams'

		})

	},

	watch: {

		checkedTeams () {

			if (this.checkedTeams.length < this.countTeams && this.areAllTeamsSelected === true) {

				this.$store.commit('areAllTeamsSelectedFalse');

			} else if (this.checkedTeams.length === this.countTeams) {

				this.$store.commit('areAllTeamsSelectedTrue');

			}

		}


	},

	components: {}

});
