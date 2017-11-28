'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			usersIn: [],
			usersOut: [],
			allUsersInOut: [],
			groupToModify: undefined,
			query: ''

		};

	},
	mounted () {

		if (this.group) {

			let _usersIn = [];
			let _usersOut = [];

			this.groupToModify = JSON.parse(JSON.stringify(this.group));
			this.usersOut = this.groupToModify.users.user;
			this.allUsersInOut = this.groupToModify.users.user;
			this.usersOut.forEach((user) => {

				if (user.selected) {

					_usersIn.push(user);

				} else _usersOut.push(user);

			});

			this.usersIn = _usersIn;
			this.usersOut = _usersOut;
			this.$emit('groupUsers', this.usersIn);

		}

	},

	computed: {

		...mapGetters({

			dataToAddGroup: 'dataToAddGroup',
			currentAnim: 'currentAnim',
			group: 'group'

		}),
		filteredList: function () {

			this.allUsersInOut.sort((userA, userB) => { // tri alphabétique

				let labelA = userA.label.toLowerCase();
				let labelB = userB.label.toLowerCase();
				if (labelA < labelB) return -1;
				else if (labelA > labelB) return 1;
				else return 0;

			});

			let vm = this;
			return this.allUsersInOut.filter(function (user) {

				return user.label.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;

			});

		}

	},

	methods: {

		addGroupUsers (user) {

			let index;
			this.usersOut.forEach((userOut) => {

				if (userOut.rowid === user.rowid) index = this.usersOut.indexOf(userOut);

			});

			this.usersIn.push(user);
			this.usersOut.splice(index, 1);
			this.$emit('groupUsers', this.usersIn);

		},
		removeGroupUsers (user) {

			let index;
			this.usersIn.forEach((userIn) => {

				if (userIn.rowid === user.rowid) index = this.usersIn.indexOf(userIn);

			});

			this.usersOut.unshift(user);
			this.usersIn.splice(index, 1);
			this.$emit('groupUsers', this.usersIn);

		},
		detectUser (user) {

			let userIsOut;
			for (let i = 0; i < this.usersOut.length; i++) {

				if (this.usersOut[i].rowid === user.rowid) { // si le user est dehors

					userIsOut = true;
					break;

				}

			}

			if (userIsOut) return 0; // dehors
			else return 1; // dedans

		}

	},
	watch: {

		dataToAddGroup (value) {

			if (!this.groupToModify) {

				this.usersOut = JSON.parse(JSON.stringify(value.users));
				this.allUsersInOut = JSON.parse(JSON.stringify(value.users));

			}

		},
		currentAnim (value, oldValue) {

			for (let i = 0; i < this.usersOut.length; i++) {

				if (this.usersOut[i].rowid === value.rowid) {

					this.usersIn.push(value);
					this.usersOut.splice(i, 1);

				}

			}
			this.$emit('groupUsers', this.usersIn);

		}

	}

});
