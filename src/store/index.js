import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './state'
import VuexPersistence from 'vuex-persist'

//VuexPersistence解决vuex页面刷新数据丢失
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store ({
    plugins: [vuexLocal.plugin],
    actions,
    mutations,
    getters,
    state,
})