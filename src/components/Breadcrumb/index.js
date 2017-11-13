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

	props: ['paths'],

	mounted () {

	},

	computed: {

		...mapGetters({

		})

	},

	methods: {

	},
	watch: {

	}

});
