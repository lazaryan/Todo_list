import { API } from 'utils'
import {
	SAVE_TASK
} from './tasks/types'

export const getTask = payload =>
	(dispatch, getState) => new API().read(`${getState().app.REST.task}/${payload.section_id}/${payload.entity_id}`, null, SAVE_TASK, dispatch)