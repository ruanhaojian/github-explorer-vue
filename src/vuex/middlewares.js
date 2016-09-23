/**
 * Created by ruanhaojian on 16/8/22.
 */
import createLogger from 'vuex/logger'

export default process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
