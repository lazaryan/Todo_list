import update from 'immutability-helper'
import { Reducer } from './types'
import {
  GET_USER
} from '../actions/app/types'

export interface Store {
  status: boolean,
  user?: {
    email: string,
    name?: string
  }
}

export const initialState: Store = {
  status: false
}

export const reducers: Reducer<Store> = {
  [GET_USER]: (payload: Store) => (console.log(23423423, payload), { $merge: payload }),
}

export default (state = initialState, action) =>
  reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
