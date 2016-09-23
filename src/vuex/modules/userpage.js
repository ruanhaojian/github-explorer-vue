import {
    USER_PROFILE_RECEIVED
} from '../types'

const state = {
    profile : {},
    repos   : []
}

const mutations = {
    [USER_PROFILE_RECEIVED](state , action){
        state.profile = action.profile
    }
}

export default {
    state,
    mutations
}