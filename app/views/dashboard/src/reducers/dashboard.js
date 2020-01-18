import update from 'immutability-helper'
import { findIndex as _findIndex, filter as _filter } from 'lodash'
import {
	SET_STATE,
	UPDATE_DASHBOARD,
	SET_SECTIONS,
	INIT_SECTION,
	CREATE_SECTION,
	UPDATE_SECTION,
	REMOVE_SECTION,
	SET_TASKS,
	CREATE_TASK,
	UPDATE_TASK
} from '../actions/dashboard/types'

const initialState = {
	name: undefined,
	style: undefined,
	sections: [],
	items: []
}

const reducres = {
	[SET_STATE]: payload => ({ $merge: payload }),
	[UPDATE_DASHBOARD]: payload => ({ $merge: payload }),
	[SET_SECTIONS]: payload => ({ sections: { $set: payload.sections } }),
	[INIT_SECTION]: payload => ({ sections: { $push: [payload] } }),
	[CREATE_SECTION]: (payload, { sections }) => ({ sections: { [sections.length - 1]: { $merge: payload } } }),
	[UPDATE_SECTION]: (payload, { sections }) => ({ sections: { [_findIndex(sections, ['entity_id', payload.entity_id])]: { $merge: payload } } }),
	[REMOVE_SECTION]: (payload, { sections, items }) => ({
		sections: { $splice: [[_findIndex(sections, ['entity_id', payload.entity_id]), 1]] },
		items: { $set: _filter(items, item => item.section_id != payload.entity_id) }
	}),
	[SET_TASKS]: payload => ({ items: { $set: payload. tasks } }),
	[CREATE_TASK]: payload => ({ items: { $push: [payload] } }),
	[UPDATE_TASK]: (payload, { items }) => ({ items: {[_findIndex(items, ['entity_id', payload.entity_id])]: { $merge: payload }  } }),
}

export default (state = initialState, action) =>
	reducres[action.type] ? update(state, reducres[action.type](action.payload, state)) : state
