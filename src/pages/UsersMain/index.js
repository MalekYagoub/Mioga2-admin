'use strict';
import Vue from 'vue';
import('./styles.scss');

import UsersActionsComponent from '@/components/UsersActions';
import UsersTableComponent from '@/components/UsersTable';
import NavBarComponent from '@/components/NavBar';
import BreadcrumbComponent from '@/components/Breadcrumb';
import Slideout from 'vue-slideout';
import { mapGetters } from 'vuex';

export default Vue.extend({

	name: 'usersMainPage',
	template: require('./template.html'),
	props: {},

	data () {

		return {
			menuIsActive: false
		};

	},

	computed: {
		...mapGetters({

			feedbackUsers: 'feedbackUsers'

		})
	},

	methods: {

	},

	components: {
		'usersActions': UsersActionsComponent,
		'usersTable': UsersTableComponent,
		'navBar': NavBarComponent,
		'breadcrumb': BreadcrumbComponent,
		Slideout
	},

	mounted () {

	}
});
