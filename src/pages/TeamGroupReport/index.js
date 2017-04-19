'use strict';
import Vue from 'vue';
import('./styles.scss');

import TeamGroupReportTableComponent from '@/components/TeamGroupReportTable';

export default Vue.extend({

	name: 'teamGroupReportPage',
	template: require('./template.html'),
	props: {},

	data () {

		return {};

	},

	methods: {},

	components: {

		'teamGroupReportTable': TeamGroupReportTableComponent

	},
	mounted () {

	}
});
