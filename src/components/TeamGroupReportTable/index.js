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

		this.$store.dispatch('getTeamGroupReport');

	},

	methods: {

	},

	computed: {
		...mapGetters({

			teamGroupReport: 'teamGroupReport'
		})
	},

	watch: {

	},

	components: {}

});
