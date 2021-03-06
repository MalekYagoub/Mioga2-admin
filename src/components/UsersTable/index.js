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
			},
			allUsers: undefined
		};

	},

	created () {},

	mounted () {

		let payload = {$http: this.$http};
		this.$store.dispatch('getUsers', payload);
		this.$store.dispatch('getUserStatuses', payload);

	},

	methods: {

		selectAllUsers () {

			this.$store.commit('checkUsers');

		},
		checkUser (user) {

			if (this.checkedUsers.indexOf(user.rowid) === -1) this.$store.commit('pushCheckUser', user.rowid);
			else this.$store.commit('removeCheckedUser', user.rowid);

		},
		detailsUser (rowid) {

			this.$store.dispatch('getUser', {$http: this.$http, rowid: rowid, $router: this.$router});

		},
		submit () {

			this.$store.dispatch('getFilteredUsers', {$http: this.$http, match: this.filterChoices.match, firstname: this.filterChoices.firstname, lastname: this.filterChoices.lastname, email: this.filterChoices.email, status: this.filterChoices.status});
			this.isFilterMenuOn = false;

		},
		destroyFilter () {

			this.$store.commit('filteredUsers');
			this.filterChoices = {
				match: 'begins'
			};
			this.isFilterMenuOn = false;

		},
		dispatchAction (action) {

			if (this.checkedUsers.length > 0) {

				let rowIdsData = this.$store.getters.getRowIdsData('users');
				let payload = { rowIdsData: rowIdsData, $http: this.$http };
				this.$store.dispatch(action, payload);
				this.$store.commit('checkUsers', 0
					);

			}

		}

	},

	computed: {

		...mapGetters({

			users: 'users',
			userStatuses: 'userStatuses',
			filteredUsers: 'filteredUsers',
			countUsers: 'countUsers',
			areAllUsersSelected: 'areAllUsersSelected',
			checkedUsers: 'checkedUsers',
			loadingActionUsers: 'loadingActionUsers'

		})

	},

	watch: {

		checkedUsers () {

			if (this.checkedUsers.length < this.countUsers && this.areAllUsersSelected === true) {

				this.$store.commit('areAllSelectedFalse');

			} else if (this.checkedUsers.length === this.countUsers) {

				this.$store.commit('areAllSelectedTrue');

			}

		}

	},

	components: {}
});
