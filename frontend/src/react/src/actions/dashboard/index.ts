import { API, DispatchFn, getStateFn} from 'utils'
import {
    GET_COLUMNS,
    GET_DASHBOARD
} from './types'

export const getDashboard = (dashboardId: string, actionType = GET_DASHBOARD) =>
    (dispatch: DispatchFn, getState: getStateFn) => new API().read({ url: `/api/dashboard/${dashboardId}`, actionType, dispatch })

export const getColumns = (actionType = GET_COLUMNS) =>
    (dispatch: DispatchFn, getState: getStateFn) => new API().read({ url: '/api/dashboard', actionType, dispatch })