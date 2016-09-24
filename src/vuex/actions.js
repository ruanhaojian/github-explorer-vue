/**
 * Created by ruanhaojian on 16/8/22.
 */
import api from '../api'
import * as types from './types'

export const showMsg = ({dispatch}, content, type = 'error') => {
    dispatch(types.SHOW_MSG, {content: content, type: type})
}

export const triggerLoadAnimation = ({ dispatch }) => {
    dispatch(types.TRIGGER_LOAD_ANIMATION);
};
export const triggerLoadAnimationDone = ({ dispatch }) => {
    dispatch(types.TRIGGER_LOAD_ANIMATION_DONE);
    setTimeout(() => {
        dispatch(types.TRIGGER_LOAD_ANIMATION_HIDE);
    }, 600);
};
export const triggerLoadAnimationFailed = ({ dispatch }) => {
    dispatch(types.TRIGGER_LOAD_ANIMATION_FAILED);
};

export const getRandomUser = ({dispatch}, username) => {

    dispatch(types.TRIGGER_LOAD_ANIMATION)

    if(username){
        return getUserProfileAndRepos({dispatch}, username)
    }

    return api.getRandomUser().then(response => {

        if (!response.ok) {
            return dispatch(types.TRIGGER_LOAD_ANIMATION_FAILED)
        }

        const user = response.json().items[0]

        getUserProfileAndRepos({dispatch}, user.login)

    }, response => {
        dispatch(types.TRIGGER_LOAD_ANIMATION_FAILED)
    })

}

export const getUserProfileAndRepos = ({dispatch}, username) => {

    return Promise.all([
        api.getUserProfile(username),
        api.getUserProfileRepos(username)
    ]).then(([ res1, res2 ]) => {
    
        const profile = res1.json() || {}
        const repos = (res1.json() || {items:[]}).items
    
        dispatch(types.USER_PROFILE_RECEIVED, {
            profile: profile
        })
        dispatch(types.USER_PROFILE_REPOS_RECEIVED, {
            repos: repos
        })

        dispatch(types.TRIGGER_LOAD_ANIMATION_DONE)
        setTimeout(() => {
            dispatch(types.TRIGGER_LOAD_ANIMATION_HIDE)
        }, 600)
    }, () => {
        dispatch(types.TRIGGER_LOAD_ANIMATION_FAILED)
    });

}
