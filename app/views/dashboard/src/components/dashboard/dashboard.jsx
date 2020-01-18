import { useState, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty as _isEmpty, filter as _filter } from 'lodash'
import { ThemeContext } from 'styled-components'
import uuid from 'uuid'

import { Flex } from 'reflexbox'
import { Button } from 'ui'
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

	const sections = !_isEmpty(dashboard.sections) &&
		_filter(dashboard.sections, section => !section.hide) || []

	useEffect(() => {
		_isEmpty(sections) && handleCreateBoard()
		
		context.handleSaveBoard = handleSaveBoard
		context.handleRemoveBoard = handleRemoveBoard
		context.handleUpdateBoard = handleUpdateBoard
	}, [])

	const handleCreateBoard = () => (
		setDisabledAdd(true),
		dispatch({
			type: INIT_SECTION,
			payload: { entity_id: uuid(), isNew: true }
		})
	)

	const handleSaveBoard = payload =>
		dispatch(createSection({...payload, isNew: false}))
			.then(() => (
				payload.isNew && setDisabledAdd(false)
			))
			.catch(console.error)

	const handleUpdateBoard = payload =>
		dispatch(updateSection(payload))
			.then()
			.catch(console.error)

	const handleRemoveBoard = payload =>
		payload.isNew &&
			(
				setDisabledAdd(false),
				dispatch({ type: REMOVE_SECTION, payload })
			) ||
			dispatch(removeSection(payload))
				.then()
				.catch(console.error)

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
