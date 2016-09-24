import {
    USER_REPOS_RECEIVED,
    USER_REPOS_NEXT_PAGE_RECEIVED,
} from '../types'

const state = {
    page: 1,
    repos : [],
    complete: false
}

const mutations = {
    [USER_REPOS_RECEIVED](state , action){
        state.repos = action.repos
        state.complete = action.complete
    },
    [USER_REPOS_NEXT_PAGE_RECEIVED](state , action){
        state.page = action.page
        state.repos = state.repos.concat(action.repos)
        state.complete = action.complete
    },

}

export default {
    state,
    mutations
}