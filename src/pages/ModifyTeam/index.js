'use strict';
import Vue from 'vue';
import('./styles.scss');

import AddTeamBoxComponent from '@/components/AddTeamBox';
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

		'addTeamBox': AddTeamBoxComponent,
		'navBar': NavBarComponent

	}
});
