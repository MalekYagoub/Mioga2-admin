'use strict';
import Vue from 'vue';
import('./styles.scss');

import TeamsActionsComponent from '@/components/TeamsActions';
import TeamsTableComponent from '@/components/TeamsTable';
import NavBarComponent from '@/components/NavBar';

export default Vue.extend({

	name: 'teamsMainPage',
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
		'teamsActions': TeamsActionsComponent,
		'teamsTable': TeamsTableComponent,
		'navBar': NavBarComponent
	},

	mounted () {

	}
});
