import { API, DispatchFn } from 'utils'
import {
    GET_DASHBOARDS,
    CREATE_DASHBOARD,
    DELETE_DASHBOARD
} from './types'

export const getDashboards = (actionType = GET_DASHBOARDS) =>
    (dispatch: DispatchFn) => new API().read({ url: '/api/dashboard', actionType, dispatch })

export const createDashboard = (actionType = CREATE_DASHBOARD) =>
    (dispatch: DispatchFn) => new API().create({ url: '/api/dashboard' })

export const deleteDashboard = (dashboardId: string, actionType = DELETE_DASHBOARD) =>
    (dispatch: DispatchFn) => new API().delete({ url: `/api/dashboard/${dashboardId}`, actionType, dispatch })
