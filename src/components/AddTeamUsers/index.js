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
			query: ''

		};

	},

	mounted () {

		let team = this.team;
		let _this = this;
		let payload = {$http: this.$http, type: 'all'};

		this.$store.dispatch('getUsers', payload).then(function (response) {

			_this.usersOut = _this.$store.getters.allUsers;
			_this.allUsersInOut = JSON.parse(JSON.stringify(_this.$store.getters.allUsers));

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

	},

	computed: {

		...mapGetters({

			allUsers: 'allUsers',
			team: 'team'

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
			return this.allUsersInOut.filter(function (user) { // résultat de l'entrée dans la barre de recherche

				return user.label.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;

			});

		}

	},

	methods: {

		addUserTeam (user) {

			let index;
			this.usersOut.forEach((userOut) => {

				if (userOut.rowid === user.rowid) index = this.usersOut.indexOf(userOut);

			});

			this.usersIn.push(user);
			this.usersOut.splice(index, 1);
			this.$emit('teamUsers', this.usersIn);

		},
		removeUserTeam (user) {

			let index;
			this.usersIn.forEach((userIn) => {

				if (userIn.rowid === user.rowid) index = this.usersIn.indexOf(userIn);

			});

			this.usersOut.push(user);
			this.usersIn.splice(index, 1);
			this.$emit('teamUsers', this.usersIn);

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

	}

});
