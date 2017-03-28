'use strict';
import Vue from 'vue';
import('./styles.scss');

import UsersActionsComponent from '@/components/UsersActions';
import UsersTableComponent from '@/components/UsersTable';

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
		'usersTable': UsersTableComponent
	},

	mounted () {

	}
});
