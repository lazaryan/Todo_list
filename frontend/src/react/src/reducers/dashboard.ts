import update from 'immutability-helper'
import { Reducer } from './types'
import {
  GET_DASHBOARD,
  UPDATE_DASHBOARD_NAME
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
  [UPDATE_DASHBOARD_NAME]: (payload: any, state: Store, requestPayload: { name: string }) => ({ dashboard: { name: { $set: requestPayload.name } } }),
}

export default (state = initialState, action) =>
  reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
