import { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { isEmpty as _isEmpty, without as _without, filter as _filter } from 'lodash'

import { Flex, Box } from 'reflexbox'
import { Text, Input, Button, Loader, Dropdown, Icon, Popup, Skeleton as UISkeleton } from 'ui'
import { Transition } from 'theme'

import { removeSection, updateSection } from '../../../actions/dashboard'
import { REMOVE_SECTION } from '../../../actions/dashboard/types'

import Edit from './edit'

import Context from '../context'

export const Component = props => {
	const dispatch = useDispatch()

	const themeContext = useContext(ThemeContext)
	const context = useContext(Context)

	const itemsDashboard = useSelector(state => state.dashboard.items)

	const [state, setState] = useState(props.item || {})
	const [items, setItems] = useState([])
	const [isNewBoard, setIsNewBoard] = useState(context.initializedItem === state.entity_id)
	const [process, setProcess] = useState([])

	const [initialUpdateName, setInitialUpdateName] = useState()
	const [initialAddTask, setInitialAddTask] = useState()

	useEffect(() => {
		isNewBoard && setInitialUpdateName(true)
	}, [])

	useEffect(() => {
		setItems(getItems())
	}, [itemsDashboard])

	useEffect(() => {
		setState(props.item)
	}, [props.item])

	const getItems = () => _filter(itemsDashboard, item => item.section_id == state.entity_id)

	const handleUpdateState = (field, value) => {
		setState({
			...state,
			[field]: value
		})
	}

	const handleUpdate = (field, value) =>
		context.handleUpdateBoard({
			entity_id: state.entity_id,
			[field]: value
		})

	const handleBlurName = value => (
		!value && (
			isNewBoard && removeBoard() || handleUpdateState('name', props.item.name)
		),
		!isNewBoard && (
			handleUpdateState('name', props.item.name),
			setInitialUpdateName(false)
		)
	)

	const handleUpdateName = () => (
		!state.name && dontSaveUpdateName(),
		state.name && (
			setProcess([...process, updateSection]),
			isNewBoard && (
				context.handleSaveBoard(state)
					.then(() => (
						setProcess(_without(process, updateSection)),
						setIsNewBoard(false),
						setInitialUpdateName(false)
					))
					.catch(console.error)
			) ||
				context.handleUpdateBoard(state)
					.then(() => (
						setProcess(_without(process, updateSection)),
						setInitialUpdateName(false)
					))
					.catch(console.error)
		)
	)

	const removeBoard = () => (
		setProcess([...process, updateSection]),
		context.handleRemoveBoard(state)
	)

	const dontSaveUpdateName = () => (
		isNewBoard && removeBoard() || (
			handleUpdateState('name', props.item.name),
			setInitialUpdateName(false)
		)
	)

	const handleRemoveBoard = () => confirm('Are you sure ?') && removeBoard()
	const handleHideBoard = () => confirm('Are you sure you want to hide the board?') && (
		setProcess([...process, updateSection]),
		handleUpdate('hide', true)
	)

	return (
		<Flex sx={props.sx}>
			<Flex height="max-content" flexDirection="column" sx={{ borderRadius: '10px 10px 0 0', boxShadow: `2px 0 15px ${themeContext.colors.default.border.main}`, overflow: 'hidden' }}>
				<Flex px="1.2rem" height="5rem" alignItems="center">
					<Flex mr="1rem">
						{!initialUpdateName &&
							<Text onDoubleClick={() => setInitialUpdateName(true)} sx={{ width: '18rem' }}>{state.name}</Text> ||
							<Input value={state.name} onChange={value => handleUpdateState('name', value)} onKeyEnter={handleUpdateName} onKeyEscape={dontSaveUpdateName} focus={isNewBoard} sx={{ width: '18rem' }} />
						}
					</Flex>
					<Flex width="5rem" justifyContent="center">
						{!initialUpdateName &&
							<Dropdown toggle={
								<Button disabled={isNewBoard} background={themeContext.mixin.icons.burger.main} />
							}>
								<Dropdown.Button onClick={() => setInitialUpdateName(true)}>Edit name</Dropdown.Button>
								<Dropdown.Button onClick={handleHideBoard}>Hide</Dropdown.Button>
								<Dropdown.Button onClick={handleRemoveBoard} sx={{ color: themeContext.colors.default.bg.red }}>Remove</Dropdown.Button>
							</Dropdown> ||
							<>
								<Button disabled={process.includes(updateSection)} onClick={handleUpdateName} agree sx={{ mr: '.5rem' }} />
								<Button disabled={process.includes(updateSection)} onClick={dontSaveUpdateName} delete />
							</>
						}
					</Flex>
				</Flex>
				<Loader active={process.includes(updateSection)} />
				<Flex flexDirection="column" alignItems="center" pt="1rem">
					{_isEmpty(items) && !initialAddTask &&
						<Text styles={themeContext.text.styles.placeholder} >task list is empty</Text>
					}
					{initialAddTask && <UISkeleton height="3rem" width={[.9]} />}
					<Flex width={[1]} pt="1rem" pb=".5rem" justifyContent="center">
						<Button disabled={isNewBoard} onClick={() => setInitialAddTask(true)} styles={themeContext.button.styles.accent} sx={{ fontSize: '.8rem', width: '80%' }}>Add task +</Button>
					</Flex>
				</Flex>
			</Flex>
			<Transition in={initialAddTask} delay={200}>
				<Edit onExit={() => setInitialAddTask(false)} create />
			</Transition>
		</Flex>
	)
}

export const Skeleton = props => {
	const themeContext = useContext(ThemeContext)

	return (
		<Flex sx={props.sx}>
			<Flex height="max-content" flexDirection="column" sx={{ borderRadius: '10px 10px 0 0', boxShadow: `2px 0 15px ${themeContext.colors.default.border.main}`, overflow: 'hidden' }}>
				<Flex px="1.2rem" height="5rem" alignItems="center">
					<Flex mr="1rem">
						<UISkeleton width="18rem" height="3rem" sx={{ alignSelf: 'center' }} />
					</Flex>
					<Flex width="5rem" justifyContent="center">
						<UISkeleton width="2rem" height="2rem" />
					</Flex>
				</Flex>
				<Loader />
				<Flex flexDirection="column" alignItems="center" pt="1rem">
					{[...Array(props.count || 2)].map((item, index) =>
						<UISkeleton key={index} width="90%" height="4rem" mb=".5rem" />
					)}
					<Flex width={[1]} pt="1rem" pb=".5rem" justifyContent="center">
						<UISkeleton width="80%" height="3rem" />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Component
