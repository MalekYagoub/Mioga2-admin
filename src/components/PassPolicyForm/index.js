'use strict';

import Vue from 'vue';
import('./styles.scss');
import { mapGetters } from 'vuex';

export default Vue.extend({
	template: require('./template.html'),

	data () {

		return {

			secretQuestion: undefined,
			minLength: undefined,
			minLetter: undefined,
			minDigit: undefined,
			minSpecialChar: undefined,
			minModifCase: undefined

		};

	},

	mounted () {

		this.$store.dispatch('getPassPolicy', {$http: this.$http});

	},

	methods: {

		submit () {

			this.$store.dispatch('setPassPolicy', {$http: this.$http, $router: this.$router, pwd_min_length: this.minLength, pwd_min_letter: this.minLetter, pwd_min_digit: this.minDigit, pwd_min_special: this.minSpecialChar, pwd_min_chcase: this.minModifCase, use_secret_question: this.secretQuestion});

		},
		changeSecretQuestionState () {

			this.secretQuestion = !this.secretQuestion;
			console.log(this.secretQuestion);

		},
		minPassPolicyChange (payload) {

			payload.sign === '+' && payload.value === 'length' ? this.minLength += 1
			: payload.sign === '-' && payload.value === 'length' ? this.minLength -= 1
			: payload.sign === '+' && payload.value === 'letter' ? this.minLetter += 1
			: payload.sign === '-' && payload.value === 'letter' ? this.minLetter -= 1
			: payload.sign === '+' && payload.value === 'digit' ? this.minDigit += 1
			: payload.sign === '-' && payload.value === 'digit' ? this.minDigit -= 1
			: payload.sign === '+' && payload.value === 'specialChar' ? this.minSpecialChar += 1
			: payload.sign === '-' && payload.value === 'specialChar' ? this.minSpecialChar -= 1
			: payload.sign === '+' && payload.value === 'modifCase' ? this.minModifCase += 1
			: payload.sign === '-' && payload.value === 'modifCase' ? this.minModifCase -= 1
			: undefined;

		}

	},

	computed: {

		...mapGetters({

			passPolicy: 'passPolicy'

		})

	},

	watch: {

		passPolicy (value) {

			this.secretQuestion = value.use_secret_question;
			this.minLength = value.pwd_min_length;
			this.minLetter = value.pwd_min_letter;
			this.minDigit = value.pwd_min_digit;
			this.minSpecialChar = value.pwd_min_special;
			this.minModifCase = value.pwd_min_chcase;


		}

	}

});
