import update from 'immutability-helper'
import {
	SET_STATE
} from '../actions/dashboard/types'

const initialState = {
	name: undefined,
	access: undefined
}

const reducres = {
	[SET_STATE]: payload => ({ $merge: payload }),
}

export default (state = initialState, action) =>
	reducres[action.type] ? update(state, reducres[action.type](action.payload, state)) : state
