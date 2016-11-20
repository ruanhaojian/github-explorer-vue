/**
 * Created by ruanhaojian on 16/8/22.
 */
import * as resources from './resources'


export default {
    getRandomUser: () => resources.getRandomUserResource.get(),
    getUserProfile: (username) => resources.getUserProfileResource.get({username:username}),
    getUserProfileRepos: (username) => resources.getUserProfileReposResource.get({username:username}),
    getUsers: (keyword) => resources.getUsersResource(keyword).get(),
    searchUserRepos: (username, keyword, page) => resources.searchUserReposResource(username, keyword, page).get(),
    getRepoDetail: (username, repoName) => resources.getRepoDetailResource.get({username: username, repoName: repoName}),
    getRepoReadme: (username, repoName) => resources.getRepoReadmeResource.get({username: username, repoName: repoName}),
    getRepoContents: (username, repoName) => resources.getRepoContentsResource.get({username: username, repoName: repoName}),
    getRepoContribs: (username, repoName) => resources.getRepoContribsResource.get({username: username, repoName: repoName}),
    getRepoLanguages: (username, repoName) => resources.getRepoLanguagesResource.get({username: username, repoName: repoName}),
}
