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
				user: {},
				skeletonFile: undefined,
				default_app: '',
				public_part: undefined,
				history: undefined
			},
			dataToAddGroupReady: {},
			groupToModify: undefined,
			optionsLoaded: false
		};

	},
	mounted () {

		this.$store.commit('currentAnim', undefined);
		if (this.group) {

			this.groupToModify = JSON.parse(JSON.stringify(this.group));

			this.groupToModify.users.user.forEach((user) => {

				if (user.rowid === this.groupToModify.group.anim_id) {

					this.formSelect.user = user;

				}

			});

			this.formInput.ident = this.groupToModify.group.ident;
			this.formInput.description = this.groupToModify.group.description;
			this.formSelect.lang = this.groupToModify.group.lang;
			this.formSelect.default_app = this.groupToModify.group.default_app;
			this.formSelect.public_part = this.groupToModify.group.public_part;
			this.formSelect.history = this.groupToModify.group.history;
			this.formSelect.skeletonFile = ' ';

			this.$emit('input', this.formInput);
			this.$emit('selectChange', this.formSelect);
			this.$store.commit('currentDefaultApp', this.formSelect.default_app);

		}

		/* if (this.dataToAddGroup) { // ligne a enlver pour normal

			this.dataToAddGroupReady = this.dataToAddGroup;
			this.optionsLoaded = true;
			this.formSelect.skeletonFile = this.dataToAddGroup.skeletons[0].file;

			this.formSelect.lang = this.currentSkeleton.attributes.lang;
			this.formSelect.default_app = this.currentSkeleton.attributes.default_app;
			this.formSelect.history = this.currentSkeleton.attributes.history;
			this.formSelect.public_part = this.currentSkeleton.attributes.public_part;
			this.$store.commit('currentDefaultApp', this.formSelect.default_app);

		} */

	},
	methods: {

		inputChange () {

			this.formInput.ident === '' ? undefined : this.$emit('input', this.formInput);

		},
		selectChange () {

			this.$emit('selectChange', this.formSelect);

		},
		animChange () {

			this.$store.commit('currentAnim', this.formSelect.user);

		},
		defaultAppChange () {

			this.$store.commit('currentDefaultApp', this.formSelect.default_app);

		},
		skeletonChange () {

			this.$store.dispatch('getDataSkeleton', {$http: this.$http, lang: this.formSelect.lang, file: this.formSelect.skeletonFile});

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

					this.formSelect.skeletonFile = value.skeletons[0].file;

				}

			} else {

				this.dataToAddGroupReady.users.forEach((user) => {

					if (user.rowid === this.formSelect.user.rowid) this.formSelect.user = user;

				});

			}

		},

		currentSkeleton (value) {

			if (!this.groupToModify) {

				this.formSelect.lang = value.attributes.lang;
				this.formSelect.default_app = value.attributes.default_app;
				this.formSelect.history = value.attributes.history;
				this.formSelect.public_part = value.attributes.public_part;
				this.$store.commit('currentDefaultApp', this.formSelect.default_app);

			}

		}

	}
});
