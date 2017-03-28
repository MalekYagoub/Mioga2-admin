import Vue from 'vue';
import Router from 'vue-router';

import MainPage from '@/pages/Home';

import UsersPage from '@/pages/Users';
import UsersMainPage from '@/pages/UsersMain';
import AddUserPage from '@/pages/AddUser';

Vue.use(Router);

export default new Router({
	hashbang: false,
	pushState: true,
	history: true,
	abstract: false,
	saveScrollPosition: true,
	transitionOnLoad: true,
	mode: 'hash',
	routes: [
		{
			path: '/',
			name: 'home',
			component: MainPage
		}, {
			path: '/users',
			component: UsersPage,
			children: [{
				path: '',
				component: UsersMainPage,
				name: 'users'
			}, {
				path: 'addUser',
				component: AddUserPage,
				name: 'addUser'
			}]
		}]
});
