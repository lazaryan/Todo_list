import { useState, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { isEmpty as _isEmpty, without as _without } from 'lodash'

import { Flex } from 'reflexbox'
import { Text, Input, Button, Loader, Skeleton as UISkeleton } from 'ui'

import { removeSection, updateSection } from '../../../actions/dashboard'

import Context from '../context'

export const Component = props => {
	const dispatch = useDispatch()

	const themeContext = useContext(ThemeContext)
	const context = useContext(Context)

	const [state, setState] = useState(props.item || {})
	const [isNewBoard, setIsNewBoard] = useState()
	const [process, setProcess] = useState([])

	useEffect(() => {
		setIsNewBoard(context.addingItem === state.entity_id)
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
		setProcess([...process, updateSection]),
		value && (
			dispatch(updateSection({ entity_id: state.entity_id, name: value }))
				.then(() => setProcess(_without(process, updateSection)))
				.catch(console.error)
		),
		!value && (
			isNewBoard && (
				dispatch(removeSection(state))
					.then()
					.catch(console.error)
			) || (
				setProcess(_without(process, updateSection)),
				handleUpdateState('name', props.item.name)
			)
		),
		isNewBoard && (
			context.addingItem = undefined,
			setIsNewBoard(false)
		)
	)

	return (
		<Flex sx={props.sx}>
			<Flex height="max-content" flexDirection="column" sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', boxShadow: `2px 0 15px ${themeContext.colors.default.border.main}`, overflow: 'hidden' }}>
				<Flex px="1.2rem" height="5rem">
					<Input value={state.name} onChange={value => handleUpdateState('name', value)} onBlur={handleBlurName} focus={isNewBoard} sx={{ width: '18rem' }} />
				</Flex>
				<Loader active={process.includes(updateSection)} />
				<Flex flexDirection="column" alignItems="center" pt="1rem">
					<Text>task list</Text>
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
			<Flex height="max-content" flexDirection="column" sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', boxShadow: `2px 0 15px ${themeContext.colors.default.border.main}`, overflow: 'hidden' }}>
				<Flex px="1.2rem" height="5rem">
					<UISkeleton width="18rem" height="3rem" sx={{ alignSelf: 'center' }} />
				</Flex>
				<Loader />
				<Flex flexDirection="column" alignItems="center" pt="1rem">
					{[...Array(props.count || 2)].map((item, index) =>
						<UISkeleton key={index} width="18rem" height="4rem" mb=".5rem" />
					)}
					<Flex pt="1rem" pb=".5rem" justifyContent="center">
						<UISkeleton width="12rem" height="3rem" />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Component
