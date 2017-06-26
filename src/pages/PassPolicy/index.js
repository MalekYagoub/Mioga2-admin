'use strict';
import Vue from 'vue';
import('./styles.scss');

import PassPolicyFormComponent from '@/components/PassPolicyForm';

export default Vue.extend({

	name: 'addUser',
	template: require('./template.html'),
	props: {},

	data () {

		return {};

	},

	methods: {},

	components: {
		'passPolicy': PassPolicyFormComponent
	}
});
