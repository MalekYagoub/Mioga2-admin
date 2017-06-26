import Vue from 'vue';
import Router from 'vue-router';

import MainPage from '@/pages/Home';

import UsersPage from '@/pages/Users';
import UsersMainPage from '@/pages/UsersMain';
import AddUserPage from '@/pages/AddUser';
import ImportUsersPage from '@/pages/ImportUsers';
import ModifyUserPage from '@/pages/ModifyUser';

import PassPolicyPage from '@/pages/PassPolicy';


import TeamsPage from '@/pages/Teams';
import TeamsMainPage from '@/pages/TeamsMain';
import AddTeamPage from '@/pages/AddTeam';
import ModifyTeamPage from '@/pages/ModifyTeam';
import TeamGroupReportPage from '@/pages/TeamGroupReport';

import GroupsPage from '@/pages/Groups';
import GroupsMainPage from '@/pages/GroupsMain';
import AddGroupPage from '@/pages/AddGroup';
import ModifyGroupPage from '@/pages/ModifyGroup';

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
			}, {
				path: 'importUsers',
				component: ImportUsersPage,
				name: 'importUsers'
			}, {
				path: 'modifyUser',
				component: ModifyUserPage,
				name: 'modifyUser'
			}, {
				path: 'passPolicy',
				component: PassPolicyPage,
				name: 'passPolicy'
			}]
		}, {
			path: '/teams',
			component: TeamsPage,
			children: [{
				path: '',
				component: TeamsMainPage,
				name: 'teams'
			}, {
				path: 'addTeam',
				component: AddTeamPage,
				name: 'addTeam'
			}, {
				path: 'modifyTeam',
				component: ModifyTeamPage,
				name: 'modifyTeam'
			}, {
				path: 'teamGroupReport',
				component: TeamGroupReportPage,
				name: 'teamGroupReport'
			}]
		}, {
			path: '/groups',
			component: GroupsPage,
			children: [{
				path: '',
				component: GroupsMainPage,
				name: 'groups'
			}, {
				path: 'addGroup',
				component: AddGroupPage,
				name: 'addGroup'
			}, {
				path: 'modifyGroup',
				component: ModifyGroupPage,
				name: 'modifyGroup'
			}]
		}]
});
