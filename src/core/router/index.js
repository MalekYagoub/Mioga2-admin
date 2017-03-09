import Vue from 'vue';
import Router from 'vue-router';
import ExampleComponent from '@/components/Example';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Example',
			component: ExampleComponent
		}
	]
});
