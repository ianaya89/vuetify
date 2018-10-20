import Vue from 'nativescript-vue';

import store from './store';

import Home from './components/Home';

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({
    render: h => h(Home),
    store,
}).$start();