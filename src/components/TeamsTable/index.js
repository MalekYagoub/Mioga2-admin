'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

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

		}

	},

	computed: {

		...mapGetters({

			teams: 'teams',
			countTeams: 'countTeams',
			areAllTeamsSelected: 'areAllTeamsSelected',
			checkedTeams: 'checkedTeams'

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
