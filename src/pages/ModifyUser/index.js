'use strict';
import Vue from 'vue';
import('./styles.scss');

import ModifyUserFormComponent from '@/components/ModifyUserForm';
import NavBarComponent from '@/components/NavBar';

export default Vue.extend({

	name: 'modifyUser',
	template: require('./template.html'),
	props: {},

	data () {

		return {};

	},

	methods: {},

	components: {

		'modifyUserForm': ModifyUserFormComponent,
		'navBar': NavBarComponent

	}
});
