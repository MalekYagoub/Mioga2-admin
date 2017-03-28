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

		this.$store.dispatch('getUsers', this.$http);

	},

	methods: {

		selectAllUsers () {

			this.$store.commit('checkUsers');

		},

		checkUser (rowid) {

			if (this.checkedUsers.indexOf(rowid) === -1) this.$store.commit('pushCheckUser', rowid);
			else this.$store.commit('removeCheckedUser', rowid);

		}

	},

	computed: {

		...mapGetters({

			users: 'users',
			countUsers: 'countUsers',
			areAllSelected: 'areAllSelected',
			checkedUsers: 'checkedUsers'

		})

	},

	watch: {

		checkedUsers () {

			if (this.checkedUsers.length < this.countUsers && this.areAllSelected === true) {

				this.$store.commit('areAllSelectedFalse');

			} else if (this.checkedUsers.length === this.countUsers) {

				this.$store.commit('areAllSelectedTrue');

			}

		}

	},

	components: {}
});
