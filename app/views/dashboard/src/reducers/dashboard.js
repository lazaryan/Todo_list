import update from 'immutability-helper'
import { findIndex as _findIndex, filter as _filter } from 'lodash'
import {
	SET_STATE,
	UPDATE_DASHBOARD,
	SET_SECTIONS,
	CREATE_SECTION,
	UPDATE_SECTION,
	REMOVE_SECTION
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
	[CREATE_SECTION]: payload => ({ sections: { $push: [payload] } }),
	[UPDATE_SECTION]: (payload, { sections }) => ({ sections: { [_findIndex(sections, ['entity_id', payload.entity_id])]: { $merge: payload } } }),
	[REMOVE_SECTION]: (payload, { sections, items }) => ({
		sections: { $splice: [[_findIndex(sections, ['entity_id', payload.entity_id]), 1]] },
		items: { $set: _filter(items, item => item.section_id != payload.entity_id) }
	}),
}

export default (state = initialState, action) =>
	reducres[action.type] ? update(state, reducres[action.type](action.payload, state)) : state
