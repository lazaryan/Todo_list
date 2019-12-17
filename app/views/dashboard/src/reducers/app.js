import update from 'immutability-helper'
import {
	SET_STATE,
	SET_USER,
	SET_THEME,
} from '../actions/types'

const initialState = {
	REST: {},
	data: {},
	user: {},
	theme: undefined
}

const reducers = {
	[SET_STATE]: payload => ({ $merge: payload }),
	[SET_USER]: payload => ({ user: { $set: payload } }),
	[SET_THEME]: payload => ({ theme: { $set: payload.theme } }),
}

export default (state = initialState, action) =>
	reducers[action.type] ? update(state, reducers[action.type](action.payload, state)) : state
