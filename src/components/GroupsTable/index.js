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

		}

	},

	computed: {

		...mapGetters({

			groups: 'groups',
			countGroups: 'countGroups',
			areAllGroupsSelected: 'areAllGroupsSelected',
			checkedGroups: 'checkedGroups'

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
