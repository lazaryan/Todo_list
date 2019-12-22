import { useState, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty as _isEmpty, without as _without } from 'lodash'
import { ThemeContext } from 'styled-components'
import uuid from 'uuid'

import { Flex, Box } from 'reflexbox'
import { Text, Button, Skeleton as UISkeleton } from 'ui'
import Board, { Skeleton as BoardSkeleton } from './dashboard/board'

import { createSection, updateSection, removeSection } from '../../actions/dashboard'

import { INIT_SECTION, REMOVE_SECTION } from '../../actions/dashboard/types'

import Context from './context'

export const Component = props => {
	const dispatch = useDispatch()

	const themeContext = useContext(ThemeContext)
	const context = useContext(Context)

	const dashboard = useSelector(state => state.dashboard)

	const [disabledAdd, setDisabledAdd] = useState(false)

	const sections = !_isEmpty(dashboard.sections) && dashboard.sections || []

	useEffect(() => {
		context.handleSaveBoard = handleSaveBoard
		context.handleRemoveBoard = handleRemoveBoard
		context.handleUpdateBoard = handleUpdateBoard
	}, [])

	const handleCreateBoard = () => {
		const entity_id = uuid()

		setDisabledAdd(true)
		setInitializedItem(entity_id)
		dispatch({
			type: INIT_SECTION,
			payload: { entity_id }
		})
	}

	const handleSaveBoard = payload => (
		dispatch(createSection(payload))
			.then(() => (
				setInitializedItem(undefined),
				setDisabledAdd(false)
			))
			.catch(console.error)
	)

	const handleUpdateBoard = payload => (
		dispatch(updateSection(payload))
			.then()
			.catch(console.error)
	)

	const handleRemoveBoard = payload => (
		isInitializedItem(payload) && (
			setInitializedItem(undefined),
			setDisabledAdd(false),
			dispatch({
				type: REMOVE_SECTION,
				payload
			})
		)||
		dispatch(removeSection(payload))
			.then(() => setDisabledAdd(false))
			.catch(console.error)
	)

	const setInitializedItem = payload => context.initializedItem = payload
	const isInitializedItem = payload => context.initializedItem === payload.entity_id

	return (
		<Flex pt="1rem" pl="2rem" flex="none" sx={{ minWidth: '100%' }}>
			{sections.map(item =>
				<Board key={item.entity_id} item={item} sx={{ mr: '2rem' }}/>
			)}
			<Button onClick={handleCreateBoard} disabled={disabledAdd} styles={themeContext.button.styles.accent} sx={{ width: '15rem', height: '3rem' }}>Add Board +</Button>
		</Flex>
	)
}

export const Skeleton = props => (
	<Flex width={[1]} pt="1rem" pl="2rem">
		<BoardSkeleton count={2} sx={{ mr: '2rem' }} />
		<BoardSkeleton count={4} sx={{ mr: '2rem' }} />
		<BoardSkeleton count={1} sx={{ mr: '2rem' }} />
	</Flex>
)

export default Component
