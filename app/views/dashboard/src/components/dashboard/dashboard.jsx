import { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { values as _values, isEmpty as _isEmpty, without as _without } from 'lodash'
import { ThemeContext } from 'styled-components'

import { Flex, Box } from 'reflexbox'
import { Text, Button, Skeleton as UISkeleton } from 'ui'
import Board, { Skeleton as BoardSkeleton } from './dashboard/board'

import { createSection } from '../../actions/dashboard'

import Context from './context'

export const Component = props => {
	const dispatch = useDispatch()

	const themeContext = useContext(ThemeContext)
	const context = useContext(Context)

	const dashboard = useSelector(state => state.dashboard)

	const [process, setProcess] = useState([])

	const sections = !_isEmpty(dashboard.sections) && dashboard.sections || []

	const handleCreateBoard = () => (
		setProcess([...process, createSection]),
		dispatch(createSection())
			.then(({ payload }) => context.addingItem = payload.entity_id)
			.catch(console.error)
			.finally(() => setProcess(_without(process, createSection)))
	)

	return (
		<Flex pt="1rem" pl="2rem" flex="none" sx={{ minWidth: '100%' }}>
			{sections.map(item =>
				<Board key={item.entity_id} item={item} sx={{ mr: '2rem' }}/>
			)}
			{process.includes(createSection) && <BoardSkeleton sx={{ mr: '2rem' }} />}
			<Button onClick={handleCreateBoard} disabled={process.includes(createSection)} styles={themeContext.button.styles.accent} sx={{ width: '15rem', height: '3rem' }}>Add Board +</Button>
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
