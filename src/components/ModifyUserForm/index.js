'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {
			msg: '',
			userValuesToPost: {}
		};

	},

	created () {},

	mounted () {

		this.$store.commit('error');
		if (!this.user) this.$router.push({name: 'addUser'});
		else this.userValuesToPost = this.user;

	},

	methods: {

		modifyUser () {

			this.$store.commit('error');
			this.msg = this.userValuesToPost.firstname === '' || this.userValuesToPost.lastname === '' || !/.+@.+\..+/.test(this.userValuesToPost.email) ? 'Champs invalides' : undefined;
			if (!this.msg) {

				this.userValuesToPost.rowid = this.user.rowid;
				let payload = {$http: this.$http, $router: this.$router, user: this.userValuesToPost};
				this.$store.dispatch('setUser', payload);

			}

		}

	},

	computed: {

		...mapGetters({

			user: 'user',
			error: 'error',
			isLoading: 'isLoading'

		})

	},

	watch: {

		error (value) {

			if (value === 'email') {

				this.msg = 'Email invalide';
				this.$store.commit('isLoading');

			}

		}

	},

	components: {}
});
