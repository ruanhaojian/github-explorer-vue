import Vue from 'vue'
import VueResource from 'vue-resource'
import { API_ROOT } from '../config'
import store from '../vuex/store'
import { showMsg,hideMsg } from '../vuex/actions'

const TOKEN = '48d499e1bbc2e206d1e4f720f101af12a5918806'
const REPO_PER_PAGE = 10

Vue.use(VueResource)

Vue.http.headers.common['Authorization'] = `token ${TOKEN}`;

// HTTP相关
// Vue.http.options.crossOrigin = true
// Vue.http.options.credentials = true

Vue.http.interceptors.push((request, next)=>{
    // request headers
    request.headers = request.headers || {}

    next((response) => {

        if(response.status >= 200 && response.status < 300){

        }else{
            showMsg(store,errMsg,'text')
        }

    })
})

export const getRandomUserResource = Vue.resource(`${ API_ROOT }search/users?q=type:user&page=1&per_page=1`)
export const getUserProfileResource = Vue.resource(`${ API_ROOT }users{/username}`)
export const getUserProfileReposResource = Vue.resource(`${ API_ROOT }search/repositories?q=user:{username}&sort=stars&page=1&per_page=${REPO_PER_PAGE}`)
export const getUsersResource = (keyword) => {
    return Vue.resource(`${ API_ROOT }legacy/user/search/` + `${keyword || Math.random().toString(36).split('')[2]}%20sort:followers`)
}
export const searchUserReposResource = (username, keyword, page) => {
    return Vue.resource(`${ API_ROOT }search/repositories` +
        `?q=${keyword}%20user:${username}&sort=updated&page=${page}&per_page=${REPO_PER_PAGE}`)
}
export const getRepoDetailResource = Vue.resource(`${ API_ROOT }repos{/username}{/repoName}`)
export const getRepoReadmeResource = Vue.resource(`${ API_ROOT }repos{/username}{/repoName}/readme`)
export const getRepoContentsResource = Vue.resource(`${ API_ROOT }repos{/username}{/repoName}/contents`)
export const getRepoContribsResource = Vue.resource(`${ API_ROOT }repos{/username}{/repoName}/contributors`)
export const getRepoLanguagesResource = Vue.resource(`${ API_ROOT }repos{/username}{/repoName}/languages`)



