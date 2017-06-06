'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			appsIn: [],
			appsOut: []

		};

	},
	mounted () {

		if (this.group) {

			let _appsIn = [];
			let _appsOut = [];

			this.groupToModify = JSON.parse(JSON.stringify(this.group));
			this.appsOut = this.groupToModify.applications.application;
			this.appsOut.forEach((app) => {

				if (app.selected) {

					_appsIn.push(app);

				} else _appsOut.push(app);

			});

			this.appsIn = _appsIn;
			this.appsOut = _appsOut;
			this.$emit('groupApps', this.appsIn);

		}

	},

	computed: {

		...mapGetters({

			dataToAddGroup: 'dataToAddGroup',
			currentSkeleton: 'currentSkeleton',
			currentDefaultApp: 'currentDefaultApp',
			group: 'group'

		})

	},

	methods: {

		addGroupApps (app) {

			let index = this.appsOut.indexOf(app);
			this.appsIn.push(app);
			this.appsOut.splice(index, 1);
			this.$emit('groupApps', this.appsIn);

		},
		removeGroupApps (app) {

			let index = this.appsIn.indexOf(app);
			this.appsOut.unshift(app);
			this.appsIn.splice(index, 1);
			this.$emit('groupApps', this.appsIn);

		}

	},
	watch: {

		currentSkeleton (value) {

			if (!this.groupToModify) {

				this.appsOut = JSON.parse(JSON.stringify(value.applications.application));
				this.appsIn = [];
				let reste = [];

				this.appsOut.forEach((app) => {

					if (app.selected === 1) {

						this.appsIn.push(app);

					} else {

						reste.push(app);

					}

				});

				this.appsOut = reste;
				this.$emit('groupApps', this.appsIn);

			}

		}
	}

});
