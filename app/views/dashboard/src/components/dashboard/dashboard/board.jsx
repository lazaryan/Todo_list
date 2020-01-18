import { useState, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { isEmpty as _isEmpty,  filter as _filter } from 'lodash'

import { Flex } from 'reflexbox'
import { Text, Button, Skeleton as UISkeleton } from 'ui'
import { Transition } from 'theme'

import Header, { Skeleton as HeaderSkeleton } from './board/header'
import Edit from './edit'
import Item from './item'

export const Component = props => {
	const themeContext = useContext(ThemeContext)

	const itemsDashboard = useSelector(state => state.dashboard.items)

	const [state, setState] = useState(props.item || {})
	const [items, setItems] = useState([])

	const [initialAddTask, setInitialAddTask] = useState()

	useEffect(() => {
		setItems(getItems())
	}, [itemsDashboard])

	useEffect(() => {
		setState(props.item)
	}, [props.item])

	const getItems = () => _filter(itemsDashboard, item => item.section_id == state.entity_id)

	return (
		<Flex sx={props.sx}>
			<Flex height="max-content" flexDirection="column" sx={{ borderRadius: '10px 10px 0 0', boxShadow: `2px 0 15px ${themeContext.colors.default.border.main}`, overflow: 'hidden' }}>
				<Header state={state} />
				<Flex flexDirection="column" alignItems="center" pt="1rem">
					{_isEmpty(items) && (
						!initialAddTask &&
							<Text styles={themeContext.text.styles.placeholder} >task list is empty</Text> ||
							<UISkeleton height="3rem" width={[.9]} />
					) ||
						items.map(item =>
							<Item key={item.entity_id} item={item} />
						)
					}
					<Flex width={[1]} pt="1rem" pb=".5rem" justifyContent="center">
						<Button disabled={state.isNew} onClick={() => setInitialAddTask(true)} styles={themeContext.button.styles.accent} sx={{ fontSize: '.8rem', width: '80%' }}>Add task +</Button>
					</Flex>
				</Flex>
			</Flex>
			<Transition in={initialAddTask} delay={200}>
				<Edit onExit={() => setInitialAddTask(false)} item={{section_id: state.entity_id}} create />
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
					<UISkeleton key={index} width="90%" height="4rem" mb=".5rem" />
				)}
				<Flex width={[1]} pt="1rem" pb=".5rem" justifyContent="center">
					<UISkeleton width="80%" height="3rem" />
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Component
