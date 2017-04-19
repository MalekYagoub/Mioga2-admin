'use strict';

import Vue from 'vue';
import('./styles.scss');

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {
			msg: '',
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			password2: '',
			description: '',
			ident: undefined,
			verifEmail: false,
			isValid: undefined
		};

	},

	created () {},

	mounted () {

	},

	methods: {

		submit () {

			let regexEmail = /.+@.+\..+/;
			this.msg = this.password !== this.password2 ? 'Mots de passes différents' : this.password === '' || this.password2 === '' || this.firstname === '' || this.lastname === '' || !regexEmail.test(this.email) ? 'Champs invalides' : undefined;
			if (!this.msg) {

				let payload = {$http: this.$http, $router: this.$router, user: {description: this.description, email: this.email, firstname: this.firstname, lastname: this.lastname, password: this.password, password2: this.password2, ident: this.ident}};
				this.$store.dispatch('setUser', payload);

			}

		},
		verif () {

			let regexEmail = /.+@.+\..+/;
			if (!regexEmail.test(this.email)) {

				this.msg = 'L\'adresse email est incorrect';

			} else {

				this.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib//bin/Administrateurs/Bottin/SetUser.json',
				{email: this.email, canimport: 1, canmodify: 1}).then(response => {

					let data = response.body;
					if (data.errors[0][0] === 'import' || data.errors[0][1][0] === 'unused_email') {

						this.msg = 'L\'adresse email est déja utilisé';

					} else {

						this.msg = '';
						this.verifEmail = true;
						this.ident = data.user.ident;

					}

				});

			}

		}

	},

	watch: {

	},

	components: {}
});
