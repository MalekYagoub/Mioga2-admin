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
			groupToModify: undefined

		};

	},
	mounted () {

		if (this.group) {

			let _usersIn = [];
			let _usersOut = [];

			this.groupToModify = JSON.parse(JSON.stringify(this.group));
			this.usersOut = this.groupToModify.users.user;
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

		})

	},

	methods: {

		addGroupUsers (user) {

			let index = this.usersOut.indexOf(user);
			this.usersIn.push(user);
			this.usersOut.splice(index, 1);
			this.$emit('groupUsers', this.usersIn);

		},
		removeGroupUsers (user) {

			let index = this.usersIn.indexOf(user);
			this.usersOut.unshift(user);
			this.usersIn.splice(index, 1);
			this.$emit('groupUsers', this.usersIn);

		}

	},
	watch: {

		dataToAddGroup (value) {

			if (!this.groupToModify) {

				this.usersOut = JSON.parse(JSON.stringify(value.users));

			}

		},
		currentAnim (value, oldValue) {

			for (let i = 0; i < this.usersOut.length; i++) {

				if (this.usersOut[i].rowid === value.rowid) {

					this.usersIn.push(value);
					this.usersOut.splice(this.usersOut[i - 1], 1);

				}

			}
			this.$emit('groupUsers', this.usersIn);

		}

	}

});
