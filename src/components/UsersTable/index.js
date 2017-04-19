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

		let payload = {$http: this.$http};
		this.$store.dispatch('getUsers', payload);

	},

	methods: {

		selectAllUsers () {

			this.$store.commit('checkUsers');

		},
		checkUser (rowid) {

			if (this.checkedUsers.indexOf(rowid) === -1) this.$store.commit('pushCheckUser', rowid);
			else this.$store.commit('removeCheckedUser', rowid);

		},
		detailsUser (rowid) {

			this.$store.dispatch('getUser', {$http: this.$http, rowid: rowid, $router: this.$router});

		}

	},

	computed: {

		...mapGetters({

			users: 'users',
			countUsers: 'countUsers',
			areAllUsersSelected: 'areAllUsersSelected',
			checkedUsers: 'checkedUsers'

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
