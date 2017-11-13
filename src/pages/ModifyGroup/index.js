'use strict';
import Vue from 'vue';
import('./styles.scss');

import AddGroupBoxComponent from '@/components/AddGroupBox';
import NavBarComponent from '@/components/NavBar';
import BreadcrumbComponent from '@/components/Breadcrumb';

export default Vue.extend({

	name: 'modifyGroup',
	template: require('./template.html'),
	props: {},

	data () {

		return {

			groupIdentToModify: ''

		};

	},

	methods: {

		saveGroupIdent (ident) {

			console.log(ident);
			this.groupIdentToModify = ident;

		}

	},

	components: {

		'addGroupBox': AddGroupBoxComponent,
		'navBar': NavBarComponent,
		'breadcrumb': BreadcrumbComponent

	}

});
