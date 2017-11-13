'use strict';
import Vue from 'vue';
import('./styles.scss');

import ModifyUserFormComponent from '@/components/ModifyUserForm';
import NavBarComponent from '@/components/NavBar';
import BreadcrumbComponent from '@/components/Breadcrumb';
import { mapGetters } from 'vuex';

export default Vue.extend({

	name: 'modifyUser',
	template: require('./template.html'),
	props: {},

	data () {

		return {
			userFullName: ''
		};

	},

	methods: {

	},

	components: {

		'modifyUserForm': ModifyUserFormComponent,
		'navBar': NavBarComponent,
		'breadcrumb': BreadcrumbComponent

	},

	mounted () {

		this.userFullName = JSON.parse(JSON.stringify(this.user.firstname + ' ' + this.user.lastname));

	},

	computed: {

		...mapGetters({

			user: 'user'

		})
	}
});
