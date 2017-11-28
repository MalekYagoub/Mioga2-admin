'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {
			msg: '',
			formInput: {
				ident: '',
				description: ''
			},
			formSelect: {
				lang: undefined,
				user: undefined,
				skeletonFile: {},
				default_app: '',
				public_part: undefined,
				history: undefined
			},
			dataToAddGroupReady: {},
			groupToModify: undefined,
			optionsLoaded: false,
			appsOptions: []
		};

	},
	mounted () {

		this.$store.commit('currentAnim', undefined);
		if (this.group) {

			console.log(this.group);
			this.groupToModify = JSON.parse(JSON.stringify(this.group));

			this.groupToModify.users.user.forEach((user) => {

				if (user.rowid === this.groupToModify.group.anim_id) {

					this.formSelect.user = user;

				}

			});

			this.formInput.ident = this.groupToModify.group.ident;
			this.formInput.description = this.groupToModify.group.description;
			this.formSelect.lang = this.groupToModify.group.lang;
			this.formSelect.public_part = this.groupToModify.group.public_part;
			this.formSelect.history = this.groupToModify.group.history;
			this.formSelect.skeletonFile = ' ';

			this.$emit('input', this.formInput);
			this.$emit('selectChange', this.formSelect);
			this.$store.commit('currentDefaultApp', this.formSelect.default_app);

		}

	},
	methods: {

		inputChange () {

			this.formInput.ident === '' ? undefined : this.$emit('input', this.formInput);

		},
		selectChange (val) {

			this.$emit('selectChange', this.formSelect);

		},
		publicPartChange (val) {

			this.formSelect.public_part = val.value;
			this.$emit('selectChange', this.formSelect);

		},
		historyChange (val) {

			this.formSelect.history = val.value;
			this.$emit('selectChange', this.formSelect);

		},
		animChange (val) {

			this.formSelect.user = val;
			this.$emit('selectChange', this.formSelect);
			this.$store.commit('currentAnim', this.formSelect.user);

		},
		defaultAppChange (val) {

			if (val && val.ident && val.ident !== this.formSelect.default_app) {

				this.formSelect.default_app = val;
				this.$emit('selectChange', this.formSelect);
				this.$store.commit('currentDefaultApp', this.formSelect.default_app.ident);
				console.log(this.$store.getters.currentDefaultApp);

			}

		},
		skeletonChange (val) {

			if (val && val.file !== this.formSelect.skeletonFile.file) {

				this.formSelect.skeletonFile = val; // marche que quand on met .file
				this.$emit('selectChange', this.formSelect);
				this.$store.dispatch('getDataSkeleton', {$http: this.$http, lang: this.formSelect.lang.ident, file: this.formSelect.skeletonFile.file});

			}

		}

	},
	computed: {

		...mapGetters({

			dataToAddGroup: 'dataToAddGroup',
			currentSkeleton: 'currentSkeleton',
			group: 'group'

		})

	},
	watch: {

		dataToAddGroup (value) {

			this.dataToAddGroupReady = value;
			this.optionsLoaded = true;
			if (!this.groupToModify) {

				if (value.skeletons[0].name === 'Groupe de travail BureauLib' && !this.group) {

					this.formSelect.skeletonFile = value.skeletons[0];

				}

			} else {

				this.dataToAddGroupReady.users.forEach((user) => {

					if (user.rowid === this.formSelect.user.rowid) this.formSelect.user = user;

				});

				this.dataToAddGroupReady.languages.forEach((language) => {

					if (language.ident === this.formSelect.lang) this.formSelect.lang = language;

				});

			}

		},

		currentSkeleton (value) {

			if (!this.groupToModify) {

				value.applications.application.forEach((app) => {

					if (app.is_group === 1) this.appsOptions.push(app);

				});

				this.formSelect.lang = value.attributes.lang;
				this.formSelect.default_app = value.attributes.default_app;
				this.formSelect.history = value.attributes.history;
				this.formSelect.public_part = value.attributes.public_part;

				this.dataToAddGroupReady.languages.forEach((language) => {

					if (language.ident === this.formSelect.lang) this.formSelect.lang = language;

				});

				this.$store.commit('currentDefaultApp', this.formSelect.default_app);

			} else {

				this.currentSkeleton.applications.application.forEach((app) => {

					if (app.ident === this.groupToModify.group.default_app) this.formSelect.default_app = app;

				});

			}

		}

	}
});
