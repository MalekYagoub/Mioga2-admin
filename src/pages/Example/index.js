'use strict';

import Vue from 'vue';
import('./styles.scss');
import LogoComponent from '@/components/VueLogo';

export default Vue.extend({

	template: require('./template.html'),

	props: {},

	data () {
		return {
			title: 'Welcome',
			subtitle: 'Vue JS & Webpack starter'
		};
	},

	created () {
	},

	mounted () {
	},

	methods: {},

	components: {
		'logo': LogoComponent
	}
});
