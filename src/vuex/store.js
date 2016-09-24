/**
 * Created by ruanhaojian on 16/8/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import middlewares from './middlewares'
// vuex modules
import showMsg from './modules/showmsg'
import userPage from './modules/userPage'
import header from './modules/header'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
Vue.config.debug = debug
Vue.config.warnExpressionErrors = false

const state = {
    direction: 'forward'
}

export default new Vuex.Store({
    state,
    mutations: {
        UPDATE_DIRECTION (state, direction) {
            state.direction = direction
        }
    },
    modules: {
        showMsg,
        userPage,
        header,
    },
    strict: debug,
    middlewares,

})
