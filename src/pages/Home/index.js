'use strict';
import Vue from 'vue';
import('./styles.scss');
import AppliButtonsComponent from '@/components/AppChoice';
import AppTitleComponent from '@/components/AppTitle';

export default Vue.extend({

	name: 'home',
	template: require('./template.html'),
	props: {},

	data () {

		return {};

	},

	methods: {},

	components: {
		'appliButtons': AppliButtonsComponent,
		'appTitle': AppTitleComponent
	}
});
