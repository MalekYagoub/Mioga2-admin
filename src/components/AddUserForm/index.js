'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

		};

	},

	created () {},

	mounted () {

	},

	methods: {

	},

	computed: {

		...mapGetters({

			users: 'users',
			countUsers: 'countUsers',
			areAllSelected: 'areAllSelected',
			checkedUsers: 'checkedUsers'

		})

	},

	watch: {

	},

	components: {}
});
