import { API } from 'utils'

import {
	SET_STATE
} from './types'

export const setState = () =>
	dispatch => new API().read('state', null, SET_STATE, dispatch)