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

	},

	computed: {

		...mapGetters({

			dataToAddGroup: 'dataToAddGroup',
			currentAnim: 'currentAnim'

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

			this.usersOut = JSON.parse(JSON.stringify(value.users));

		},
		currentAnim (value, oldValue) {

			for (let i = 0; i < this.usersOut.length; i++) {

				if (this.usersOut[i].rowid === value.rowid) {

					console.log(this.usersOut[i - 1]);
					this.usersIn.push(value);
					this.usersOut.splice(this.usersOut[i - 1], 1);

				}

			}
			this.$emit('groupUsers', this.usersIn);

		}

	}

});
