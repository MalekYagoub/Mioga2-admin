'use strict';
import Vue from 'vue';
import('./styles.scss');

import GroupsActionsComponent from '@/components/GroupsActions';
import GroupsTableComponent from '@/components/GroupsTable';
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
		'groupsActions': GroupsActionsComponent,
		'groupsTable': GroupsTableComponent,
		'navBar': NavBarComponent
	},

	mounted () {

	}
});
