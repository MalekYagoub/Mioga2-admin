'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			usersIn: [],
			usersOut: []

		};

	},

	mounted () {

		let team = this.team;
		let _this = this;
		let payload = {$http: this.$http, type: 'all'};

		this.$store.dispatch('getUsers', payload).then(function (response) {

			_this.usersOut = _this.$store.getters.allUsers;

			if (team) {

				_this.usersOut = [];
				team.users.user.forEach((_user) => {

					if (_user.selected && _user.selected.$a === 1) {

						_this.usersIn.push(_user);

					} else {

						_this.usersOut.push(_user);

					}

				});
				_this.$emit('teamUsers', _this.usersIn);

			}

		});
		console.log('users out :', this.usersOut);
		console.log('users in :', this.usersIn);

	},

	computed: {

		...mapGetters({

			allUsers: 'allUsers',
			team: 'team'

		})

	},

	methods: {

		addUserTeam (user) {

			let index = this.usersOut.indexOf(user);
			this.usersIn.push(user);
			this.usersOut.splice(index, 1);
			this.$emit('teamUsers', this.usersIn);

		},
		removeUserTeam (user) {

			let index = this.usersIn.indexOf(user);
			this.usersOut.push(user);
			this.usersIn.splice(index, 1);
			this.$emit('teamUsers', this.usersIn);

		}

	}

});
