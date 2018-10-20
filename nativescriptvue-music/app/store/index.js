import Vue from 'nativescript-vue';
import Vuex from '../vuex';

import music from './modules/music';

Vue.use(Vuex);

const debug = 'debug';

const store = new Vuex.Store({
    modules: {
        music,
    },
    strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;