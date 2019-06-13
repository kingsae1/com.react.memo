import Vue from 'vue';
import App from './App';
import router from './router';
import {store} from "./store";
import util from './utils';

Vue.config.productionTip = false;
Vue.prototype.$util = util;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>'
});
