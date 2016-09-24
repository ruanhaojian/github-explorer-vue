/**
 * Created by ruanhaojian on 16/8/22.
 */
import api from '../api'
import * as types from './types'

export const REPO_PER_PAGE = 10

export const showMsg = ({dispatch}, content, type = 'error') => {
    dispatch(types.SHOW_MSG, {content: content, type: type})
}

// NavMenu
export const fullNavMenu = ({ dispatch }) => {
    dispatch(types.FULL_NAV_MENU);
};
export const openNavMenu = ({ dispatch }) => {
    dispatch(types.OPEN_NAV_MENU);
};
export const closeNavMenu = ({ dispatch }) => {
    dispatch(types.CLOSE_NAV_MENU);
};
export const toggleNavMenu = ({ dispatch }) => {
    dispatch(types.TOGGLE_NAV_MENU);
};

// Header Loading
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

// UserPage
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
        const repos = (res2.json() || {items:[]}).items
    
        dispatch(types.USER_PROFILE_RECEIVED, {
            profile: profile
        })
        dispatch(types.USER_PROFILE_REPOS_RECEIVED, {
            repos: repos
        })

        triggerLoadAnimationDone({dispatch})

    }, () => {
        dispatch(types.TRIGGER_LOAD_ANIMATION_FAILED)
    });

}


// SearchUsers
export const getUsers = ({dispatch}, keyword) => {


    return api.getUsers(keyword).then(response => {

        if (!response.ok) {
            // return dispatch(types.TRIGGER_LOAD_ANIMATION_FAILED)
        }

        const users = response.json().users.slice(0, 15)

        dispatch(types.USERS_RECEIVED, {
            users: users
        })

    }, response => {
        dispatch(types.TRIGGER_LOAD_ANIMATION_FAILED)
    })

}

// SearchUserRepos
export const searchUserRepos = ({dispatch}, username, keyword, page ) => {
    
    dispatch(types.TRIGGER_LOAD_ANIMATION)
    
    return api.searchUserRepos(username, keyword, page).then(response => {
        
        if (!response.ok) {
            return dispatch(types.TRIGGER_LOAD_ANIMATION_FAILED)
        }
        
        var json = response.json()


        if (+page > 1) {
            dispatch(types.USER_REPOS_NEXT_PAGE_RECEIVED, {
                page,
                repos: json.items,
                complete: json.items.length < REPO_PER_PAGE
            })
        } else {
            dispatch(types.USER_REPOS_RECEIVED, {
                repos: json.items,
                complete: json.items.length < REPO_PER_PAGE
            })
        }

        triggerLoadAnimationDone({dispatch})
        
    }, response => {
        dispatch(types.TRIGGER_LOAD_ANIMATION_FAILED)
    })
    
}
