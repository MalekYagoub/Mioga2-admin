'use strict';
import Vue from 'vue';
import('./styles.scss');

import AddTeamBoxComponent from '@/components/AddTeamBox';

export default Vue.extend({

	name: 'addTeam',
	template: require('./template.html'),
	props: {},

	data () {

		return {

		};

	},

	methods: {

	},

	components: {

		'addTeamBox': AddTeamBoxComponent

	}
});
