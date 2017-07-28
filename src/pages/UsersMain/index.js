'use strict';
import Vue from 'vue';
import('./styles.scss');

import UsersActionsComponent from '@/components/UsersActions';
import UsersTableComponent from '@/components/UsersTable';
import NavBarComponent from '@/components/NavBar';

export default Vue.extend({

	name: 'usersMainPage',
	template: require('./template.html'),
	props: {},

	data () {

		return {
		};

	},

	computed: {

	},

	methods: {

	},

	components: {
		'usersActions': UsersActionsComponent,
		'usersTable': UsersTableComponent,
		'navBar': NavBarComponent
	},

	mounted () {

	}
});
