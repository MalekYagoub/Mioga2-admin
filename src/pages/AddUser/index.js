'use strict';
import Vue from 'vue';
import('./styles.scss');

import AddUserFormComponent from '@/components/AddUserForm';

export default Vue.extend({

	name: 'addUser',
	template: require('./template.html'),
	props: {},

	data () {

		return {};

	},

	methods: {},

	components: {
		'addUserForm': AddUserFormComponent
	}
});
