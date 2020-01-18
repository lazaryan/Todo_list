import { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty as _isEmpty, values as _values } from 'lodash'
import { ThemeContext } from 'styled-components'

import { Flex } from 'reflexbox'
import { Popup, Button, Input, Loader, Skeleton as UISkeleton } from 'ui'

import { createTask } from '../../../actions/dashboard'
import { getTask } from '../../../actions/dashboard/tasks'
import { SET_TASK, UPDATE_TASK, CLEAR_TASK } from '../../../actions/dashboard/tasks/types'

export const Component = props => {
	const themeContext = useContext(ThemeContext)
	const dispatch = useDispatch()

	const savedTasks = useSelector(state => state.tasks.tasks)
	const state = useSelector(state => state.tasks.editTask)

	const [process, setProcess] = useState([])

	useEffect(() => {
		!props.create && (
			_isEmpty(savedTasks[props.item.entity_id]) &&
				dispatch(getTask(props.item))
					.then(({ payload }) =>
						dispatch({ type: SET_TASK, payload: _values(payload)[0] })
					) ||
				dispatch({ type: SET_TASK, payload: savedTasks[props.item.entity_id] })
		) ||
		dispatch({ type: SET_TASK, payload: props.item })

		return () => dispatch({ type: CLEAR_TASK })
	}, [])

	const disabledSave = _isEmpty(state.name)

	const handleClose = () => props.onExit && props.onExit()

	const handleUpdate = (field, value) => dispatch({ type: UPDATE_TASK, payload: { [field]: value } })

	const handleCreate = () => (
		setProcess([...process, createTask]),
		dispatch(createTask(state))
			.then(handleClose)
			.catch(console.error)
	)

	const handleSave = () => {}

	return (
		_isEmpty(state) && <Skeleton onExit={handleClose} /> || <Popup>
			<Popup.Header justifyContent="space-between">
				<Input placeholder="Write task name..." value={state.name} onChange={value => handleUpdate('name', value)} styles={themeContext.input.styles.accent} sx={{ width: '80%' }} />
				<Flex ml="3rem">
					<Button sx={{ mr: '1rem' }} onClick={handleClose} styles={themeContext.button.styles.unaccent}>Close</Button>
					{props.create && 
						<Button disabled={disabledSave} onClick={handleCreate} styles={themeContext.button.styles.accent}>Create</Button> ||
						<Button onClick={handleSave} styles={themeContext.button.styles.accent}>Done</Button>
					}
				</Flex>
			</Popup.Header>
			<Loader active={process.includes(createTask)} />
			<Popup.Content alignItems="center">
				Editor
			</Popup.Content>
		</Popup>
	)
}

export const Skeleton = props => (
	<Popup sx={props.sx} onClickOutside={() => props.onExit && props.onExit()}>
		<Popup.Header justifyContent="space-between">
			<UISkeleton width={[.8]} height="3rem" />
			<Flex ml="3rem">
				<UISkeleton width="5rem" height="2rem" mr="1rem" />
				<UISkeleton width="5rem" height="2rem" />
			</Flex>
		</Popup.Header>
		<Loader />
		<Popup.Content alignItems="center">
			<UISkeleton width={[.9]} height="8rem" />
		</Popup.Content>
	</Popup>
)

export default Component
