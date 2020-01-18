import { combineReducers } from 'redux'

import app from './app'
import dashboard from './dashboard'
import tasks from './dashboard/tasks'

export default combineReducers({ app, dashboard, tasks })
