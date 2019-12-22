import { useState, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { isEmpty as _isEmpty, without as _without } from 'lodash'

import { Flex, Box } from 'reflexbox'
import { Text, Input, Button, Loader, Dropdown, Icon, Skeleton as UISkeleton } from 'ui'

import { removeSection, updateSection } from '../../../actions/dashboard'

import { REMOVE_SECTION } from '../../../actions/dashboard/types'

import Context from '../context'

export const Component = props => {
	const dispatch = useDispatch()

	const themeContext = useContext(ThemeContext)
	const context = useContext(Context)

	const [state, setState] = useState(props.item || {})
	const [isNewBoard, setIsNewBoard] = useState()
	const [process, setProcess] = useState([])

	useEffect(() => {
		setIsNewBoard(context.initializedItem === state.entity_id)
	}, [])

	useEffect(() => {
		setState(props.item)
	}, [props.item])

	const handleUpdateState = (field, value) => {
		setState({
			...state,
			[field]: value
		})
	}

	const handleBlurName = value => (
		!value && (
			isNewBoard && removeBoard() || handleUpdateState('name', props.item.name)
		),
		value && (
			setProcess([...process, updateSection]),
			isNewBoard && (
				context.handleSaveBoard(state)
					.then(() => (
						setProcess(_without(process, updateSection)),
						setIsNewBoard(false)
					))
					.catch(console.error)
			) ||
				context.handleUpdateBoard(state)
					.then(() => setProcess(_without(process, updateSection)))
					.catch(console.error)
		)
	)

	const removeBoard = () => (
		setProcess([...process, updateSection]),
		context.handleRemoveBoard(state)
	)

	const handleRemoveBoard = () => confirm('Are you sure ?') && removeBoard()

	return (
		<Flex sx={props.sx}>
			<Flex height="max-content" flexDirection="column" sx={{ borderRadius: '10px 10px 0 0', boxShadow: `2px 0 15px ${themeContext.colors.default.border.main}`, overflow: 'hidden' }}>
				<Flex px="1.2rem" height="5rem" alignItems="center">
					<Flex mr="1rem">
						<Input value={state.name} onChange={value => handleUpdateState('name', value)} onBlur={handleBlurName} focus={isNewBoard} sx={{ width: '18rem' }} />
					</Flex>
					<Dropdown toggle={
						<Flex height="2rem" width="2rem" p=".2rem"  sx={{ border: `1px solid ${themeContext.colors.default.border.main}`, borderRadius: '5px', cursor: 'pointer' }} >
							<Icon background={themeContext.mixin.icons.burger.main} sx={{ height: '1.6rem' }} />
						</Flex>
					}>
						<Dropdown.Button onClick={handleRemoveBoard} sx={{ color: '#CC0000' }}>Remove</Dropdown.Button>
					</Dropdown>
				</Flex>
				<Loader active={process.includes(updateSection)} />
				<Flex flexDirection="column" alignItems="center" pt="1rem">
					<Text styles={themeContext.text.styles.placeholder} >task list is empty</Text>
					<Flex width={[1]} pt="1rem" pb=".5rem" justifyContent="center">
						<Button styles={themeContext.button.styles.accent} sx={{ fontSize: '.8rem', width: '80%' }}>Add task +</Button>
					</Flex>
				</Flex>
			</Flex>
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
					<Flex>
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
