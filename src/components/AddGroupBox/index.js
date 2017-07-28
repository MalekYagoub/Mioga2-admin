'use strict';

import Vue from 'vue';
import('./styles.scss');

import AddGroupFormComponent from '@/components/AddGroupForm';
import AddGroupUsersComponent from '@/components/AddGroupUsers';
import AddGroupTeamsComponent from '@/components/AddGroupTeams';
import AddGroupAppsComponent from '@/components/AddGroupApps';
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {

			action: 'addGroupForm',
			msg: '',
			rowid: undefined,
			dataInput: {ident: '', description: ''},
			dataSelect: {},
			dataGroupUsers: [],
			dataGroupTeams: [],
			dataGroupApps: []

		};

	},

	mounted () {

		if (!this.group) {

			this.$router.push({name: 'addGroup'});

		} else {

			this.rowid = this.group.group.rowid;
			this.$store.commit('group', undefined);

		}

		// if (!this.dataToAddGroup) this.$store.dispatch('getDataToAddGroup', {$http: this.$http, store: this.$store});
		this.$store.dispatch('getDataToAddGroup', {$http: this.$http, store: this.$store});

	},

	methods: {

		setAction (action) {

			this.action = action;

		},
		saveInput (input) {

			this.dataInput.ident = input.ident;
			this.dataInput.description = input.description;

		},
		saveSelect (select) {

			this.dataSelect = select;

		},
		saveGroupUsers (groupUsers) {

			this.dataGroupUsers = groupUsers;

		},
		saveGroupTeams (groupTeams) {

			this.dataGroupTeams = groupTeams;

		},
		saveGroupApps (groupApps) {

			this.dataGroupApps = groupApps;

		},
		submit () {

			if (!this.dataSelect.user || !this.dataSelect.lang || !this.dataSelect.skeletonFile || !this.dataSelect.default_app) this.msg = 'Un des champs est vide';
			if (!this.dataInput.ident) this.msg = 'Insérez un identifiant';

			if (this.dataSelect.default_app.ident) this.dataSelect.default_app = this.dataSelect.default_app.ident;

			if (this.dataInput.ident && this.dataSelect.user && this.dataSelect.lang && this.dataSelect.skeletonFile && this.dataSelect.default_app) {

				let payload;
				if (!this.rowid) payload = {$http: this.$http, $router: this.$router, data: {dataInput: this.dataInput, dataSelect: this.dataSelect, dataGroupUsers: this.dataGroupUsers, dataGroupTeams: this.dataGroupTeams, dataGroupApps: this.dataGroupApps}};
				else payload = {$http: this.$http, $router: this.$router, data: {rowid: this.rowid, dataInput: this.dataInput, dataSelect: this.dataSelect, dataGroupUsers: this.dataGroupUsers, dataGroupTeams: this.dataGroupTeams, dataGroupApps: this.dataGroupApps}};
				this.$store.dispatch('addGroup', payload);

			}

		}

	},
	computed: {

		...mapGetters({

			dataToAddGroup: 'dataToAddGroup',
			group: 'group',
			isLoading: 'isLoading'

		})

	},
	components: {

		'addGroupForm': AddGroupFormComponent,
		'addGroupUsers': AddGroupUsersComponent,
		'addGroupTeams': AddGroupTeamsComponent,
		'addGroupApps': AddGroupAppsComponent

	}

});
