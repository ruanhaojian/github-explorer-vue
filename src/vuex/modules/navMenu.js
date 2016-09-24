import {
    TOGGLE_NAV_MENU,
    OPEN_NAV_MENU,
    FULL_NAV_MENU,
    CLOSE_NAV_MENU,
    USERS_RECEIVED
} from '../types'

const state = {
    open : false,
    full : false,
    users: [],
}

const mutations = {
    [TOGGLE_NAV_MENU](state , action){
        state.open = !state.open
    },
    [OPEN_NAV_MENU](state , action){
        state.full = false;
        state.open = true;
    },
    [FULL_NAV_MENU](state , action){
        state.full = true;
    },
    [CLOSE_NAV_MENU](state , action){
        state.full = false;
        state.open = false;
    },
    [USERS_RECEIVED](state , action){
        state.users = action.users;
    },
}

export default {
    state,
    mutations
}