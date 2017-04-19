'use strict';
import Vue from 'vue';
import('./styles.scss');

import TeamsActionsComponent from '@/components/TeamsActions';
import TeamsTableComponent from '@/components/TeamsTable';
console.log(TeamsTableComponent);


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
		'teamsTable': TeamsTableComponent
	},

	mounted () {

	}
});
