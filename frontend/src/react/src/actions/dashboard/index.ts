import { API, DispatchFn, getStateFn} from 'utils'
import {
    GET_COLUMNS,
    GET_DASHBOARD,
    UPDATE_DASHBOARD_NAME
} from './types'

export const getDashboard = (dashboardId: string, actionType = GET_DASHBOARD) =>
    (dispatch: DispatchFn, getState: getStateFn) => new API().read({ url: `/api/dashboard/${dashboardId}`, actionType, dispatch })

export const getColumns = (actionType = GET_COLUMNS) =>
    (dispatch: DispatchFn, getState: getStateFn) => new API().read({ url: '/api/dashboard', actionType, dispatch })

export const updateDashboardName = (payload: { id: string, name: string }, actionType = UPDATE_DASHBOARD_NAME) =>
    (dispatch: DispatchFn, getState: getStateFn) => new API().update({ url: `/api/dashboard/${payload.id}/update/name`, payload: { name: payload.name }, actionType, dispatch })
