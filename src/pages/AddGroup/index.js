'use strict';
import Vue from 'vue';
import('./styles.scss');

import AddGroupBoxComponent from '@/components/AddGroupBox';
import { mapGetters } from 'vuex';

export default Vue.extend({

	name: 'addGroup',
	template: require('./template.html'),
	props: {},

	data () {

		return {

		};

	},

	methods: {

	},

	components: {

		'addGroupBox': AddGroupBoxComponent

	},
	computed: {

		...mapGetters({

			group: 'group'

		})

	},
	mounted () {

	}
});
