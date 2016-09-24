import {
    TRIGGER_LOAD_ANIMATION,
    TRIGGER_LOAD_ANIMATION_DONE,
    TRIGGER_LOAD_ANIMATION_HIDE,
    TRIGGER_LOAD_ANIMATION_FAILED
} from '../types'

const state = {
    showLoading : false,
    doneLoading : false,
    loadFailed  : false
}

const mutations = {
    [TRIGGER_LOAD_ANIMATION](state , action){
        state.showLoading = !state.loadFailed
    },
    [TRIGGER_LOAD_ANIMATION_DONE](state , action){
        state.loadFailed = false;
        state.doneLoading = true;
    },
    [TRIGGER_LOAD_ANIMATION_HIDE](state , action){
        state.showLoading = false;
        state.loadFailed = false;
        state.doneLoading = false;
    },
    [TRIGGER_LOAD_ANIMATION_FAILED](state , action){
        state.loadFailed = true;
    },
}

export default {
    state,
    mutations
}