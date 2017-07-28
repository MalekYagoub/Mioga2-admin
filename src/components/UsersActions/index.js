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

		}

	},

	computed: {

		...mapGetters({

			getRowIdsDataUsers: 'getRowIdsDataUsers',
			users: 'users',
			countUsers: 'countUsers',
			areAllUsersSelected: 'areAllUsersSelected',
			checkedUsers: 'checkedUsers'

		})

	}

});
