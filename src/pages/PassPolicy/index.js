'use strict';
import Vue from 'vue';
import('./styles.scss');

import PassPolicyFormComponent from '@/components/PassPolicyForm';
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
		'passPolicy': PassPolicyFormComponent,
		'navBar': NavBarComponent,
		'breadcrumb': BreadcrumbComponent
	}
});
