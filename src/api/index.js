/**
 * Created by ruanhaojian on 16/8/22.
 */
import * as resources from './resources'

export default {
    
    getRandomUser: function () {
        return resources.getRandomUserResource.get()
    }
}
