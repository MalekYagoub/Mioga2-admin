'use strict';

import Vue from 'vue';
import('./styles.scss');

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {
			ident: undefined,
			description: undefined,
			lang: undefined,
			user: undefined,
			skeleton: undefined,
			default_app: undefined,
			public_part: undefined,
			history: undefined,
			languages: undefined,
			users: undefined,
			skeletons: undefined,
			applications: undefined,
			msg: ''
		};

	},
	mounted () {

		this.getDetails();

	},
	methods: {

		getDetails () {

			let _this = this;
			let urlList = ['https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetLanguages.json',
				'https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetSkeletonDetails.json?type=group&lang=fr_FR&file=01-BureauLib.xml&full_list=1',
				'https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetSkeletons.json?type=group',
				'https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/GetUsers.json'
			];

			urlList.forEach(function (url) {

				_this.$http.get(url).then((response) => {

					response.json().then((data) => {

						/Languages/.test(url) ? _this.languages = data.language
						: /SkeletonDetails/.test(url) ? _this.applications = data.applications.application
						: /Users/.test(url) ? _this.users = data.user
						: /Skeletons/.test(url) ? _this.skeletons = data.skeleton : _this.ok = 1;

					});

				});

			});

		},
		submit () {

			let txt = 'Un des champs est vide';
			this.msg = !this.lang ? txt : !this.user ? txt : !this.ident ? txt : !this.skeleton ? txt : !this.default_app ? txt : undefined;
			this.history ? this.history = 1 : this.history = 0;
			this.public_part ? this.public_part = 1 : this.public_part = 0;

			if (!this.msg) {

				this.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/SetGroup.json',
				{anim_id: this.user.rowid, default_app: this.default_app, description: this.description, ident: this.ident, history: this.history, lang: this.lang, public_part: this.public_part, skeleton: this.skeleton, users: this.user.ident, teams: 'Tous'}).then((response) => {

					response.json().then((data) => {

						// this.$router.push({ name: 'manageGroups'});

					});

				});

			}

		}

	},
	computed: {

	}

});
