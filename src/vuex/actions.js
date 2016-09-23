/**
 * Created by ruanhaojian on 16/8/22.
 */
import api from '../api'
import * as types from './types'

export const showMsg = ({dispatch}, content, type = 'error') => {
    dispatch(types.SHOW_MSG, {content: content, type: type})
}
