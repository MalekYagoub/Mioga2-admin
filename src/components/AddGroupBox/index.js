'use strict';

import Vue from 'vue';
import('./styles.scss');

import AddGroupFormComponent from '@/components/AddGroupForm';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			action: 'addGroupForm',
			msg: '',
			rowid: undefined,
			dataInput: {ident: '', description: ''},
			dataGroupUsers: [],
			dataGroupTeams: [],
			dataGroupApps: []

		};

	},

	mounted () {

	},

	methods: {

		setAction (action) {

			this.action = action;

		},
		saveInput (input) {

			this.dataInput.ident = input.ident;
			this.dataInput.description = input.description;

		},
		submit () {

			if (this.dataInput.ident) {

				let payload;
				if (!this.rowid) payload = {$http: this.$http, $router: this.$router, data: {dataInput: this.dataInput, dataTeamUsers: this.dataTeamUsers, dataTeamGroups: this.dataTeamGroups}};
				else payload = {$http: this.$http, $router: this.$router, data: {rowid: this.rowid, dataInput: this.dataInput, dataTeamUsers: this.dataTeamUsers, dataTeamGroups: this.dataTeamGroups}};
				this.$store.dispatch('addTeam', payload);

			}

		}

	},
	computed: {


	},
	components: {

		'addGroupForm': AddGroupFormComponent

	}

});
