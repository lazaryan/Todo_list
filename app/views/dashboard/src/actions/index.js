import { API } from 'utils'

import {
	SET_STATE,
	SET_USER,
	SET_THEME
} from './types'

export const setState = () =>
	dispatch => new API().read('state', null, SET_STATE, dispatch)

export const setUser = () =>
	(dispatch, getState) => new API().read(`${getState().app.REST.user}`, null, SET_USER, dispatch)

export const setTheme = theme =>
	(dispatch, getState) => new API().read(`${getState().app.REST.theme}`, { theme }, SET_THEME, dispatch)
