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

		this.userValuesToPost = this.user;
		console.log(this.user);

	},

	methods: {

		modifyUser () {

			this.msg = this.userValuesToPost.password !== this.userValuesToPost.password2 ? 'Mots de passes différents' : this.userValuesToPost.password === '' || this.userValuesToPost.password2 === '' || this.userValuesToPost.firstname === '' || this.userValuesToPost.lastname === '' || !/.+@.+\..+/.test(this.userValuesToPost.email) ? 'Champs invalides' : undefined;
			if (!this.msg) {

				this.userValuesToPost.rowid = this.user.rowid;
				let payload = {$http: this.$http, $router: this.$router, user: this.userValuesToPost};
				this.$store.dispatch('setUser', payload);

			}

		}

	},

	computed: {

		...mapGetters({

			user: 'user'

		})

	},

	watch: {

	},

	components: {}
});
