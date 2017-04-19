'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({

	template: require('./template.html'),

	data () {

		return {
			formInput: {
				ident: '',
				description: ''
			},
			teamToModify: undefined
		};

	},
	mounted () {

		this.$store.commit('responseAddTeam', undefined);
		if (this.team) {

			this.teamToModify = this.team;
			this.$emit('input', this.teamToModify.team);

		}

	},
	methods: {

		inputChange () {

			if (!this.teamToModify) this.formInput.ident === '' ? this.$emit('emptyIdent', 'Identifiant vide') : this.$emit('input', this.formInput);
			else this.teamToModify.team.ident === '' ? this.$emit('emptyIdent', 'Identifiant vide') : this.$emit('input', this.teamToModify.team);

		}

	},
	computed: {

		...mapGetters({

			team: 'team'

		})

	}

});
