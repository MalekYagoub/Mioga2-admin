'use strict';
import Vue from 'vue';
import('./styles.scss');

import AddGroupBoxComponent from '@/components/AddGroupBox';

export default Vue.extend({

	name: 'modifyGroup',
	template: require('./template.html'),
	props: {},

	data () {

		return {};

	},

	methods: {},

	components: {

		'addGroupBox': AddGroupBoxComponent

	}
});
