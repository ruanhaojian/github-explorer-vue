import {
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REPOS_RECEIVED
} from '../types'

const state = {
    profile : {},
    repos   : []
}

const mutations = {
    [USER_PROFILE_RECEIVED](state , action){
        state.profile = action.profile
    },
    [USER_PROFILE_REPOS_RECEIVED](state , action){
        state.repos = action.repos
    }
}

export default {
    state,
    mutations
}