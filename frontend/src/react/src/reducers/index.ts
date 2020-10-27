import { combineReducers } from 'redux'

import app, { Store as AppStore } from './app'
import main, { Store as MainStore } from './main'
import dashboard, { Store as DashboardStore } from './dashboard'

export interface Store {
    app: AppStore;
    main: MainStore;
    dashboard: DashboardStore;
}

export default combineReducers({ app, main, dashboard })
