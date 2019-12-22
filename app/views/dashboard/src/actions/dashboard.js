import { API } from 'utils'

import {
	SET_STATE,
	UPDATE_DASHBOARD,
	SET_SECTIONS,
	CREATE_SECTION,
	UPDATE_SECTION,
	REMOVE_SECTION
} from './dashboard/types'

export const setState = id =>
	(dispatch, getState) => new API().read(`${getState().app.REST.dashboard}/${id}`, null, SET_STATE, dispatch)

export const updateDashboard = payload =>
	(dispatch, getState) => new API().update(`${getState().app.REST.dashboard}/${payload.entity_id}`, { dashboard: payload }, UPDATE_DASHBOARD, dispatch)

export const setSections = id =>
	(dispatch, getState) => new API().read(`${getState().app.REST.sections}/${id}`, null, SET_SECTIONS, dispatch)

export const createSection = () =>
	(dispatch, getState) => new API().create(`${getState().app.REST.sections}`, null, CREATE_SECTION, dispatch)

export const updateSection = payload =>
	(dispatch, getState) => new API().update(`${getState().app.REST.sections}/${payload.entity_id}`, { section: payload }, UPDATE_SECTION, dispatch)

export const removeSection = payload =>
	(dispatch, getState) => new API().delete(`${getState().app.REST.sections}/${payload.entity_id}`, { section: payload.entity_id }, REMOVE_SECTION, dispatch)