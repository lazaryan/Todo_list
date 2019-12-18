import update from 'immutability-helper'
import {
	SET_STATE,
	UPDATE_DASHBOARD,
	SET_SECTIONS
} from '../actions/dashboard/types'

const initialState = {
	name: undefined,
	style: undefined,
	sections: {}
}

const reducres = {
	[SET_STATE]: payload => ({ $merge: payload }),
	[UPDATE_DASHBOARD]: payload => ({ $merge: payload }),
	[SET_SECTIONS]: payload => ({ sections: { $set: payload.sections } }),
}

export default (state = initialState, action) =>
	reducres[action.type] ? update(state, reducres[action.type](action.payload, state)) : state
