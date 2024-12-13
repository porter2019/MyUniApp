import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const files = require.context("./modules", false, /\.js$/);
let modules = {
	state: {},
	getters:{},
	mutations: {},
	actions: {}
};

files.keys().forEach((key) => {
  modules = {
  	state:{...modules.state,...files(key)["state"]},
  	getters:{...modules.getters,...files(key)["getters"]},
  	mutations:{...modules.mutations,...files(key)["mutations"]},
  	actions:{...modules.actions,...files(key)["actions"]}
  }
});

const store = new Vuex.Store(modules);

export default store;