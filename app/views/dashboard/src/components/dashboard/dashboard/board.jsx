import { useState, useContext, useEffect, Suspense, lazy } from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { isEmpty as _isEmpty,  filter as _filter } from 'lodash'

import { Flex } from 'reflexbox'
import { Text, Button, Skeleton as UISkeleton } from 'ui'
import { Transition } from 'theme'

import Header, { Skeleton as HeaderSkeleton } from './board/header'
import Item, { Skeleton as ItemSkeleton } from './item'

const Edit = lazy(() => import('./edit'))
import { Skeleton as EditorSkeleton } from './edit'

export const Component = props => {
	const themeContext = useContext(ThemeContext)

	const itemsDashboard = useSelector(state => state.dashboard.items)

	const [state, setState] = useState(props.item || {})
	const [items, setItems] = useState([])

	const [initialAddTask, setInitialAddTask] = useState()
	const [initialEditor, setInitialEditor] = useState()
	const [isBlocked, setIsBlocked] = useState(false)
	const [editTask, setEditTask] = useState({})

	const blockBoard = state => setIsBlocked(state != undefined ? state : true)
	const setEditItem = payload => setEditTask(payload)

	useState(() => {
		state.isNew && blockBoard()
	}, [])

	useEffect(() => {
		setItems(getItems())
	}, [itemsDashboard])

	useEffect(() => {
		setState(props.item)
	}, [props.item])

	const getItems = () => _filter(itemsDashboard, item => item.section_id == state.entity_id)

	const initNewTask = () => (
		setEditItem({section_id: state.entity_id}),
		setInitialAddTask(true),
		setInitialEditor(true)
	)

	const closeEditor = () => (
		setInitialAddTask(false),
		setInitialEditor(false)
	)

	const selectEditTask = payload => (
		setEditItem(payload),
		setInitialEditor(true)
	)

	return (
		<Flex sx={props.sx}>
			<Flex height="max-content" flexDirection="column" sx={{ borderRadius: '10px 10px 0 0', boxShadow: `2px 0 15px ${themeContext.colors.default.border.main}`, overflow: 'hidden' }}>
				<Header state={state} disabled={isBlocked} blockBoard={blockBoard} />
				<Flex flexDirection="column" alignItems="center" pt="1rem">
					{_isEmpty(items) && (
						!initialAddTask &&
							<Text styles={themeContext.text.styles.placeholder} >task list is empty</Text>
					) ||
						items.map(item =>
							<Item key={item.entity_id} item={item} onSelect={selectEditTask} />
						)
					}
					{initialAddTask && <ItemSkeleton /> }
					<Flex width={[1]} pt="1rem" pb=".5rem" justifyContent="center">
						<Button disabled={isBlocked || initialAddTask} onClick={initNewTask} styles={themeContext.button.styles.accent} sx={{ fontSize: '.8rem', width: '80%' }}>Add task +</Button>
					</Flex>
				</Flex>
			</Flex>
			<Transition in={initialEditor} delay={200}>
				<Suspense fallback={<EditorSkeleton />}>
					<Edit onExit={closeEditor} item={editTask} create={initialAddTask} />
				</Suspense>
			</Transition>
		</Flex>
	)
}

export const Skeleton = props => {
	const themeContext = useContext(ThemeContext)

	return (
		<Flex height="max-content" flexDirection="column" sx={{ borderRadius: '10px 10px 0 0', boxShadow: `2px 0 15px ${themeContext.colors.default.border.main}`, overflow: 'hidden', ...props.sx }}>
			<HeaderSkeleton />
			<Flex flexDirection="column" alignItems="center" pt="1rem">
				{[...Array(props.count || 2)].map((item, index) =>
					<ItemSkeleton key={index} />
				)}
				<Flex width={[1]} pt="1rem" pb=".5rem" justifyContent="center">
					<UISkeleton width="80%" height="3rem" />
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Component
