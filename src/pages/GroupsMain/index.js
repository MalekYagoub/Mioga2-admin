'use strict';
import Vue from 'vue';
import('./styles.scss');

import GroupsActionsComponent from '@/components/GroupsActions';
import GroupsTableComponent from '@/components/GroupsTable';
import NavBarComponent from '@/components/NavBar';
import Slideout from 'vue-slideout';
import { mapGetters } from 'vuex';

export default Vue.extend({

	name: 'teamsMainPage',
	template: require('./template.html'),
	props: {},

	data () {

		return {
		};

	},

	computed: {
		...mapGetters({

			feedbackGroups: 'feedbackGroups'

		})
	},

	methods: {

	},

	components: {
		'groupsActions': GroupsActionsComponent,
		'groupsTable': GroupsTableComponent,
		'navBar': NavBarComponent,
		Slideout
	},

	mounted () {

	}
});
