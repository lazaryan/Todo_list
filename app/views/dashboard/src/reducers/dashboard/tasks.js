import update from 'immutability-helper'
import {
	SAVE_TASK,
	UPDATE_SAVED_TASK,
	SET_TASK,
	UPDATE_TASK,
	CLEAR_TASK
} from '../../actions/dashboard/tasks/types'

export const initialState = {
	tasks: {},
	editTask: {}
}

const reducres = {
	[SAVE_TASK]: payload => ({ tasks: { $merge: payload } }),
	[UPDATE_SAVED_TASK]: payload => ({ tasks: { [payload.entity_id]: { $merge: payload } } }),
	[SET_TASK]: payload => ({ editTask: { $set: payload } }),
	[UPDATE_TASK]: payload => ({ editTask: { $merge: payload } }),
	[CLEAR_TASK]: payload => ({ editTask: { $set: {} } })
}

export default (state = initialState, action) =>
	reducres[action.type] ? update(state, reducres[action.type](action.payload, state)) : state