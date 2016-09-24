import Vue from 'vue'
import VueResource from 'vue-resource'
import {API_ROOT} from '../config'
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
    // 这里对请求体进行处理
    request.headers = request.headers || {}

    next((response) => {
        // 这里可以对响应的结果进行处理
        var errMsg = "系统异常";
        switch (response.status){
            case 401:{
                errMsg = '登录超时,请重新登录!';
            }break;
            case 403:{
                errMsg = '禁止访问';
            }break;
            case 404:{
                errMsg = '资源找不到';
            }break;
            case 405:{
                errMsg = '该请求方法不支持';
            }break;
            case 500:{
                errMsg = response.data.detail;
            }break;
        }

        if(response.status >= 200 && response.status < 300){

        }else{
            showMsg(store,errMsg,'text')
        }

        if (response.status === 401) {
            //signOut()
            //window.location.pathname = '/login'
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


