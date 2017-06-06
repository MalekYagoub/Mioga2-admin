'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

import AddTeamFormComponent from '@/components/AddTeamForm';
import AddTeamUsersComponent from '@/components/AddTeamUsers';
import AddTeamGroupsComponent from '@/components/AddTeamGroups';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			action: 'addTeamForm',
			msg: '',
			rowid: undefined,
			dataInput: {ident: '', description: ''},
			dataTeamUsers: [],
			dataTeamGroups: []

		};

	},

	mounted () {

		if (!this.team) {

			this.$router.push({name: 'addTeam'});

		} else {

			this.rowid = this.team.team.rowid;
			console.log(this.rowid);
			this.$store.commit('team', undefined);

		}

	},

	methods: {

		setAction (action) {

			this.action = action;

		},
		saveInput (input) {

			this.dataInput.ident = input.ident;
			this.dataInput.description = input.description;

		},
		saveTeamUsers (teamUsers) {

			this.dataTeamUsers = teamUsers;

		},
		saveTeamGroups (teamGroups) {

			this.dataTeamGroups = teamGroups;

		},
		saveRowidTeam (rowid) {

			this.rowid = rowid;

		},
		displayMsg (msg) {

			this.msg = msg;

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

		...mapGetters({

			responseAddTeam: 'responseAddTeam',
			team: 'team'

		})

	},
	components: {

		'addTeamForm': AddTeamFormComponent,
		'addTeamUsers': AddTeamUsersComponent,
		'addTeamGroups': AddTeamGroupsComponent

	}

});
