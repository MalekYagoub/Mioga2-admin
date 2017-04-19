'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({
	template: require('./template.html'),

	methods: {

		dispatchAction (action) {

			if (this.checkedTeams.length > 0) {

				let rowIdsData = this.$store.getters.getRowIdsData('groups');
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
			checkedTeams: 'checkedTeams'

		})

	}

});
