'use strict';

import Vue from 'vue';
import('./styles.scss');

export default Vue.extend({

	template: require('./template.html'),

	props: {},

	data () {
		return {
			title: 'Hello World',
			subtitle: 'Vue JS & Webpack starter'
		};
	},

	created () {
	},

	ready () {

	},

	methods: {},

	components: {}
});
