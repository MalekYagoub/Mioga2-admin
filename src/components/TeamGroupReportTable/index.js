'use strict';

import Vue from 'vue';
import('./styles.scss');

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			teamGroupReport: undefined

		};

	},

	created () {},

	mounted () {

		this.getTeamGroupReport();

	},

	methods: {

		getTeamGroupReport () {

			this.$http.get('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/DisplayTeamGroupReport').then((response) => {

				this.teamGroupReport = response.body;

			});

		}

	},

	computed: {

	},

	watch: {

	},

	components: {}

});
