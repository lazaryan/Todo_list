import update from 'immutability-helper'
import { Reducer } from './types'
import {
  GET_DASHBOARDS
} from '../actions/main/types'

export interface Dashboard {
    name: string;
    dashboard_id: string;
}

export interface Store {
  items: Dashboard[];
}

export const initialState: Store = {
    items: []
}

export const reducers: Reducer<Store> = {
  [GET_DASHBOARDS]: (payload: Store) => ({ items: { $set: payload } }),
}

export default (state = initialState, action) =>
  reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
