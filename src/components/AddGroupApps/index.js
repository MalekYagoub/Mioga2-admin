'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			appsIn: [],
			appsOut: [],
			allAppsInOut: [],
			query: ''

		};

	},
	mounted () {

		if (this.group) {

			let _appsIn = [];
			let _appsOut = [];

			this.groupToModify = JSON.parse(JSON.stringify(this.group));
			console.log(this.groupToModify);
			this.appsOut = this.groupToModify.applications.application;
			this.allAppsInOut = JSON.parse(JSON.stringify(this.groupToModify.applications.application));
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

		}),
		filteredList: function () {

			this.allAppsInOut.sort((appA, appB) => { // tri alphabétique

				let labelA = appA.label.toLowerCase();
				let labelB = appB.label.toLowerCase();
				if (labelA < labelB) return -1;
				else if (labelA > labelB) return 1;
				else return 0;

			});

			let vm = this;
			return this.allAppsInOut.filter(function (app) {

				return app.label.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;

			});

		}

	},

	methods: {

		addGroupApps (app) {

			let index;
			this.appsOut.forEach((appOut) => {

				if (appOut.rowid === app.rowid) index = this.appsOut.indexOf(appOut);

			});

			this.appsIn.push(app);
			this.appsOut.splice(index, 1);
			this.$emit('groupApps', this.appsIn);

		},
		removeGroupApps (app) {

			let index;
			this.appsIn.forEach((appIn) => {

				if (appIn.rowid === app.rowid) index = this.appsIn.indexOf(appIn);

			});

			this.appsOut.unshift(app);
			this.appsIn.splice(index, 1);
			this.$emit('groupApps', this.appsIn);

		},
		detectApp (app) {

			let appIsOut;
			for (let i = 0; i < this.appsOut.length; i++) {

				if (this.appsOut[i].rowid === app.rowid) { // si la app est dehors

					appIsOut = true;
					break;

				}

			}

			if (appIsOut) return 0; // dehors
			else return 1; // dedans

		}

	},
	watch: {

		currentSkeleton (value) {

			if (!this.groupToModify) {

				this.appsOut = JSON.parse(JSON.stringify(value.applications.application));
				this.allAppsInOut = JSON.parse(JSON.stringify(value.applications.application));
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

		},

		currentDefaultApp (value, oldValue) {

		}
	}

});
