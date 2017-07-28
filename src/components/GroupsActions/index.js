'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({
	template: require('./template.html'),

	methods: {

	},
	computed: {

		...mapGetters({

			groups: 'groups',
			countGroups: 'countGroups',
			areAllGroupsSelected: 'areAllGroupsSelected',
			checkedGroups: 'checkedGroups'

		})

	}

});
