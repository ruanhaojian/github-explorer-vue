/**
 * Created by ruanhaojian on 16/8/22.
 */
import * as resources from './resources'

export default {
    
    getRandomUser: () => resources.getRandomUserResource.get(),
    getUserProfile: (username) => resources.getUserProfileResource.get({username:username}),
    getUserProfileRepos: (username) => resources.getUserProfileReposResource.get({username:username}),
    getUsers: (keyword) => resources.getUsersResource(keyword).get(),


}
