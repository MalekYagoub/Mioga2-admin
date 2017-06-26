'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			groupsIn: [],
			groupsOut: [],
			allGroupsInOut: []

		};

	},

	mounted () {

		let team = this.team;
		let _this = this;
		this.$store.dispatch('getGroups', this.$http).then(function (response) {

			_this.groupsOut = JSON.parse(JSON.stringify(_this.$store.getters.groups));
			_this.allGroupsInOut = JSON.parse(JSON.stringify(_this.$store.getters.groups)); // gérer le css avec la nouvelle fonction detectGroup

			if (team) {

				_this.groupsOut = [];
				team.groups.group.forEach((_group) => {

					if (_group.selected && _group.selected.$a === 1) {

						_this.groupsIn.push(_group);

					} else {

						_this.groupsOut.push(_group);

					}

				});
				_this.$emit('teamGroups', _this.groupsIn);

			}

		});

	},

	computed: {

		...mapGetters({

			groups: 'groups',
			team: 'team'

		})

	},

	methods: {

		addGroupTeam (group) {

			let index;
			this.groupsOut.forEach((groupOut) => {

				if (groupOut.rowid === group.rowid) index = this.groupsOut.indexOf(groupOut);

			});

			this.groupsIn.push(group);
			this.groupsOut.splice(index, 1);
			this.$emit('teamGroups', this.groupsIn);

		},
		removeGroupTeam (group) {

			let index;
			this.groupsIn.forEach((groupIn) => {

				if (groupIn.rowid === group.rowid) index = this.groupsIn.indexOf(groupIn);

			});

			this.groupsOut.push(group);
			this.groupsIn.splice(index, 1);
			this.$emit('teamGroups', this.groupsIn);

		},

		detectGroup (group) {

			let groupIsOut;
			for (let i = 0; i < this.groupsOut.length; i++) {

				if (this.groupsOut[i].rowid === group.rowid) { // si le groupe est dehors

					groupIsOut = true;
					break;

				}

			}

			if (groupIsOut) return 0; // dehors
			else return 1; // dedans

		}

	}

});
