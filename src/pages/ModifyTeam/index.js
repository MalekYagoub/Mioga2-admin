'use strict';
import Vue from 'vue';
import('./styles.scss');

import AddTeamBoxComponent from '@/components/AddTeamBox';
import NavBarComponent from '@/components/NavBar';
import BreadcrumbComponent from '@/components/Breadcrumb';

export default Vue.extend({

	name: 'modifyTeam',
	template: require('./template.html'),
	props: {},

	data () {

		return {

			teamIdentToModify: ''

		};

	},

	methods: {

		saveTeamIdent (ident) {

			this.teamIdentToModify = ident;

		}

	},

	components: {

		'addTeamBox': AddTeamBoxComponent,
		'navBar': NavBarComponent,
		'breadcrumb': BreadcrumbComponent

	}

});
