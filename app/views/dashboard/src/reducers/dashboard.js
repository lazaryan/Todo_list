import { update } from 'immutability-helper'

const initialState = {}

const reducres = {}

export default (state = initialState, action) =>
	reducres[action.type] ? update(state, reducres[action.type](action.payload, state)) : state
