import update from 'immutability-helper'
import { Reducer } from './types'
import {
  GET_DASHBOARD,
  UPDATE_DASHBOARD_NAME,
  GET_COLUMNS,
  CREATE_COLUMN,
  UPDATE_COLUMN_NAME,
  DELETE_COLUMN
} from '../actions/dashboard/types'
import _findIndex from 'lodash/findIndex'

import { Dashboard } from './main'

export interface Column {
    entity_id: string;
    name: string;
    show: boolean;
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
  [GET_COLUMNS]: (payload: Column[]) => ({ columns: { $set: payload } }),
  [CREATE_COLUMN]: (payload: Column, state: Store) => ({ columns: { $push: [payload] } }),
  [UPDATE_COLUMN_NAME]: (payload: any, state: Store, requestPayload: { name: string, id: string }) => ({ columns: { [_findIndex(state.columns, (item: Column) => item.entity_id == requestPayload.id)]: { name: { $set: requestPayload.name } } } }),
  [DELETE_COLUMN]: (payload: any, state: Store) => ({ columns: { $set: state.columns.filter((item: Column) => item.entity_id !== payload) } }),
}

export default (state = initialState, action) =>
  reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
