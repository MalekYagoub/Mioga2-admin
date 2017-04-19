'use strict';
import Vue from 'vue';
import('./styles.scss');

export default Vue.extend({

	name: 'importUsers',
	template: require('./template.html'),
	props: {},

	data () {

		return {};

	},

	methods: {},

	components: {

	},

	mounted () {

		window.location.replace('https://bureaulib.extranet.alixen.fr/BureauLib//bin/Administrateurs/Bottin/ImportUsers');

	}
});
