import {
    REPO_DETAIL_RECEIVED_ALL
} from '../types'

const state = {
    repoData      : {},
    repo       : {},
    readme     : '',
    contribs   : [],
    contents   : [],
    languages  : []
}

const mutations = {
    [REPO_DETAIL_RECEIVED_ALL](state , action){
        
        state.repo = action.repo
        state.readme = action.readme
        state.contribs = action.contribs
        state.contents = action.contents
        state.languages = action.languages
    },
}

export default {
    state,
    mutations
}