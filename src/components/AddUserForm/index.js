'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {
			msg: '',
			firstname: '',
			lastname: '',
			email: '',
			description: '',
			ident: undefined,
			verifEmail: false,
			isValid: undefined
		};

	},

	created () {},

	mounted () {

		this.$store.commit('error');

	},

	methods: {

		submit () {

			this.$store.commit('error');
			let regexEmail = /.+@.+\..+/;
			this.msg = this.firstname === '' || this.lastname === '' || !regexEmail.test(this.email) ? 'Champs invalides' : undefined;
			if (!this.msg) {

				let payload = {$http: this.$http, $router: this.$router, user: {description: this.description, email: this.email, firstname: this.firstname, lastname: this.lastname, ident: this.ident}};
				this.$store.dispatch('setUser', payload);

			}

		},
		verif () {

			this.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib//bin/Administrateurs/Bottin/SetUser.json',
			{email: this.email, canimport: 1, canmodify: 1}).then(response => {

				let data = response.body;
				if (data.errors[0][0] === 'import' || data.errors[0][1][0] === 'unused_email') {

					this.msg = 'L\'adresse email est déja utilisé';

				} else if (response.body.errors[0][0] === 'email') {

					this.msg = 'Email invalide';

				} else {

					this.msg = '';
					this.verifEmail = true;
					this.ident = data.user.ident;

				}

			});

		}

	},

	computed: {

		...mapGetters({

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
