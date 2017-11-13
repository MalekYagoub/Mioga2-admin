'use strict';
import Vue from 'vue';
import('./styles.scss');

import AddUserFormComponent from '@/components/AddUserForm';
import NavBarComponent from '@/components/NavBar';
import BreadcrumbComponent from '@/components/Breadcrumb';

export default Vue.extend({

	name: 'addUser',
	template: require('./template.html'),
	props: {},

	data () {

		return {};

	},

	methods: {},

	components: {
		'addUserForm': AddUserFormComponent,
		'navBar': NavBarComponent,
		'breadcrumb': BreadcrumbComponent
	}
});
