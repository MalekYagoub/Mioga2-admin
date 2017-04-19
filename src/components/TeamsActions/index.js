'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({
	template: require('./template.html'),

	methods: {

		dispatchAction (action) {

			if (this.checkedTeams.length > 0) {

				let rowIdsData = this.$store.getters.getRowIdsData('teams');
				let payload = { rowIdsData: rowIdsData, $http: this.$http };
				this.$store.dispatch(action, payload);

			}

		},
		downloadCsv () {

			HTMLElement.prototype.click = function () {

				let evt = this.ownerDocument.createEvent('MouseEvents');
				evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				this.dispatchEvent(evt);

			};
			this.$http.post('https://bureaulib.extranet.alixen.fr/BureauLib/bin/Administrateurs/Colbert/ExportTeamGroupReport').then(response => {

				let link = document.createElement('a');
				link.setAttribute('href', encodeURI('data:text/csv;charset=utf-8,' + response.body));
				link.setAttribute('download', 'BureauLib-TeamGroupReport.csv');
				link.click();

			});

		}

	},
	computed: {

		...mapGetters({

			teams: 'teams',
			countTeams: 'countTeams',
			areAllTeamsSelected: 'areAllTeamsSelected',
			checkedTeams: 'checkedTeams'

		})

	}

});
