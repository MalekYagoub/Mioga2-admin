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
				lang: '',
				user: {},
				skeleton: '',
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

		}

	},
	computed: {

		...mapGetters({

			dataToAddGroup: 'dataToAddGroup'

		})

	},
	watch: {

		dataToAddGroup (value) {

			this.dataToAddGroupReady = value;

		}

	}
});
