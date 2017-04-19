// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import App from '@/pages/App';
import router from '@/core/router/';
import store from '@/core/store/';
import '@/stylesheets/main.scss';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

/* eslint-disable */
new Vue({
	el: '#application',
	router,
	store,
	template: '<App/>',
	components: { App }
});
