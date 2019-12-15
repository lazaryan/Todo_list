import { API } from 'utils'

import {
	SET_STATE
} from './dashboard/types'

export const setState = id =>
	(dispatch, getState) => new API().read(`${getState().app.REST.dashboard}/${id}`, null, SET_STATE, dispatch) 