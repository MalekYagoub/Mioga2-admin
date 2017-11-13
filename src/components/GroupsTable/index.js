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

		this.$store.dispatch('getGroups', this.$http);

	},

	methods: {

		selectAllGroups () {

			this.$store.commit('checkGroups');

		},
		checkGroup (rowid) {

			if (this.checkedGroups.indexOf(rowid) === -1) this.$store.commit('pushCheckGroup', rowid);
			else this.$store.commit('removeCheckedGroup', rowid);

		},
		detailsGroup (rowid) {

			this.$store.dispatch('getGroup', {$http: this.$http, rowid: rowid, $router: this.$router});

		},
		submit () {

			this.$store.dispatch('getFilteredGroups', {$http: this.$http, match: this.filterChoices.match, ident: this.filterChoices.ident, animator: this.filterChoices.animator});
			this.isFilterMenuOn = false;

		},
		destroyFilter () {

			this.$store.commit('filteredGroups');
			this.filterChoices = {
				match: 'begins'
			};
			this.isFilterMenuOn = false;

		},
		dispatchAction (action) {

			if (this.checkedGroups.length > 0) {

				let rowIdsData = this.$store.getters.getRowIdsData('groups');
				let payload = { rowIdsData: rowIdsData, $http: this.$http };
				this.$store.dispatch(action, payload);

			}

		}

	},

	computed: {

		...mapGetters({

			groups: 'groups',
			countGroups: 'countGroups',
			areAllGroupsSelected: 'areAllGroupsSelected',
			checkedGroups: 'checkedGroups',
			filteredGroups: 'filteredGroups',
			loadingActionGroups: 'loadingActionGroups'

		})

	},

	watch: {

		checkedGroups () {

			if (this.checkedGroups.length < this.countGroups && this.areAllGroupsSelected === true) {

				this.$store.commit('areAllGroupsSelectedFalse');

			} else if (this.checkedGroups.length === this.countGroups) {

				this.$store.commit('areAllGroupsSelectedTrue');

			}

		}


	},

	components: {}

});
