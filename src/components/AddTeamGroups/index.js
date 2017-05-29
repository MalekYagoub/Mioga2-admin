'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			groupsIn: [],
			groupsOut: []

		};

	},

	mounted () {

		let team = this.team;
		let _this = this;
		this.$store.dispatch('getGroups', this.$http).then(function (response) {

			_this.groupsOut = _this.$store.getters.groups;

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

			let index = this.groupsOut.indexOf(group);
			this.groupsIn.push(group);
			this.groupsOut.splice(index, 1);
			this.$emit('teamGroups', this.groupsIn);

		},
		removeGroupTeam (group) {

			let index = this.groupsIn.indexOf(group);
			this.groupsOut.push(group);
			this.groupsIn.splice(index, 1);
			this.$emit('teamGroups', this.groupsIn);

		}

	}

});
