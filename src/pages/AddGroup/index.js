'use strict';
import Vue from 'vue';
import('./styles.scss');

import AddGroupBoxComponent from '@/components/AddGroupBox';
import NavBarComponent from '@/components/NavBar';
import { mapGetters } from 'vuex';
import BreadcrumbComponent from '@/components/Breadcrumb';

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

		'addGroupBox': AddGroupBoxComponent,
		'navBar': NavBarComponent,
		'breadcrumb': BreadcrumbComponent

	},
	computed: {

		...mapGetters({

			group: 'group'

		})

	},
	mounted () {

	}
});
