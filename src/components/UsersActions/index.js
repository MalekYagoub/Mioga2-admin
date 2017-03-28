'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({
	template: require('./template.html'),

	methods: {

		downloadCsv () {

			HTMLElement.prototype.click = function () {

				let evt = this.ownerDocument.createEvent('MouseEvents');
				evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				this.dispatchEvent(evt);

			};
			this.$store.dispatch('downloadCsv', this.$http);

		},
		dispatchAction (action) {

			if (this.checkedUsers.length > 0) {

				let rowIdsData = this.getRowIdsDataUsers;
				let payload = { rowIdsData: rowIdsData, $http: this.$http };
				this.$store.dispatch(action, payload);

			}

		}

	},

	computed: {

		...mapGetters({

			getRowIdsDataUsers: 'getRowIdsDataUsers',
			users: 'users',
			countUsers: 'countUsers',
			areAllSelected: 'areAllSelected',
			checkedUsers: 'checkedUsers'

		})

	}

});
