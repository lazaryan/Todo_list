import update from 'immutability-helper'
import { Reducer } from './types'
import {
  GET_DASHBOARD
} from '../actions/dashboard/types'

import { Dashboard } from './main'

export interface Column {
    name: string;
}

export interface Task {
    name: string;
}

export interface Store {
  dashboard: Dashboard | undefined;
  columns: Column[];
  tasks: {
    [key: string]: Task[]
  }
}

export const initialState: Store = {
    dashboard: undefined,
    columns: [],
    tasks: {}
}

export const reducers: Reducer<Store> = {
  [GET_DASHBOARD]: (payload: Dashboard) => ({ dashboard: { $set: payload } }),
}

export default (state = initialState, action) =>
  reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
