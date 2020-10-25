import { API, DispatchFn } from 'utils'
import {
    GET_DASHBOARDS,
    CREATE_DASHBOARD
} from './types'

export const getDashboards = (actionType = GET_DASHBOARDS) =>
    (dispatch: DispatchFn) => new API().read({ url: '/api/dashboard', actionType, dispatch })

export const createDashboard = (actionType = CREATE_DASHBOARD) =>
    (dispatch: DispatchFn) => new API().create({ url: '/api/dashboard', })
