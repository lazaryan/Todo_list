import { API } from 'utils'

import {
	SET_STATE,
	UPDATE_DASHBOARD,
	SET_SECTIONS
} from './dashboard/types'

export const setState = id =>
	(dispatch, getState) => new API().read(`${getState().app.REST.dashboard}/${id}`, null, SET_STATE, dispatch)

export const updateDashboard = payload =>
	(dispatch, getState) => new API().update(`${getState().app.REST.dashboard}/${payload.entity_id}`, { dashboard: payload }, UPDATE_DASHBOARD, dispatch)

export const setSections = id =>
	(dispatch, getState) => new API().read(`${getState().app.REST.sections}/${id}`, null, SET_SECTIONS, dispatch)
