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
			dataToAddGroupReady: {}
		};

	},
	mounted () {

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
			if (value.skeletons[0].name === 'Groupe de travail BureauLib' && !this.group) {

				this.formSelect.skeletonFile = value.skeletons[0].file;

			}

		},

		currentSkeleton (value) {

			if (!this.group) {

				this.formSelect.lang = value.attributes.lang;
				this.formSelect.default_app = value.attributes.default_app;
				this.formSelect.history = value.attributes.history;
				this.formSelect.public_part = value.attributes.public_part;

			}

		}

	}
});
