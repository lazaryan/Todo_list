import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { values as _values, isEmpty as _isEmpty, pull as _pull } from 'lodash'

import { Flex, Box } from 'reflexbox'
import { Text, Button, Skeleton as UISkeleton } from 'ui'
import Board, { Skeleton as BoardSkeleton } from './dashboard/board'

import { createSection } from '../../actions/dashboard'

export const Component = props => {
	const dispatch = useDispatch()
	const dashboard = useSelector(state => state.dashboard)

	const [process, setProcess] = useState([])

	const sections = _values(dashboard.sections)

	const handleCreateBoard = e => (
		setProcess([...process, createSection]),
		dispatch(createSection())
			.then(() => setProcess([..._pull(process, createSection)]))
			.catch(console.error)
	)

	return (
		<Flex pt="1rem" pl="2rem" flex="none" sx={{ minWidth: '100%' }}>
			{!_isEmpty(dashboard.sections) && dashboard.sections.map(item =>
				<Board key={item.entity_id} item={item} sx={{ mr: '2rem' }}/>
			)}
			{process.includes(createSection) && <BoardSkeleton sx={{ mr: '2rem' }} />}
			<Button onClick={handleCreateBoard} disabled={process.includes(createSection)} styles={props => props && props.theme.button.styles.accent} sx={{ width: '15rem', height: '3rem' }}>Add Board +</Button>
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
