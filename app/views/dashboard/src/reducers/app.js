import update from 'immutability-helper'
import {
	SET_STATE
} from '../actions/types'

const initialState = {
	REST: {},
	theme: undefined
}

const reducers = {
	[SET_STATE]: payload => ({ $merge: payload }),
}

export default (state = initialState, action) =>
	reducers[action.type] ? update(state, reducers[action.type](action.payload, state)) : state
