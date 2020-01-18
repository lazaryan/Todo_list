import { useState, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ThemeContext } from 'styled-components'
import { without as _without, isEmpty as _isEmpty } from 'lodash'

import { Text, Input, Dropdown, Button, Loader, Skeleton as UISkeleton } from 'ui'
import { Flex } from 'reflexbox'

import { UPDATE_SECTION } from '../../../../actions/dashboard/types'

import Context from '../../context'

export const Header = props => {
	const dispatch = useDispatch()

	const themeContext = useContext(ThemeContext)
	const context = useContext(Context)

	const [process, setProcess] = useState([])
	const [state, setState] = useState(props.state)
	const [initialName, setInitialName] = useState(state.name || '')
	const [initialUpdateName, setInitialUpdateName] = useState(state.isNew || _isEmpty(state.name))

	const disabledSaveName = _isEmpty(state.name) || process.includes(context.handleSaveBoard)
	const disabledDontSaveName = process.includes(context.handleSaveBoard)

	useEffect(() => {
		setState(props.state)
	}, [props.state])

	useEffect(() => {
		setInitialName(state.name)
	}, [initialUpdateName])

	const handleUpdate = (field, value) =>
		dispatch({type: UPDATE_SECTION, payload: {
			entity_id: state.entity_id,
			[field]: value
		}})

	const handleSave = () => {
		setProcess([...process, context.handleSaveBoard]),
		state.isNew && (
			context.handleSaveBoard(state)
				.then(() => (
					setProcess(_without(process, context.handleSaveBoard)),
					setInitialUpdateName(false)
				))
		) ||
			context.handleUpdateBoard(state)
				.then(() => (
					setProcess(_without(process, context.handleSaveBoard)),
					setInitialUpdateName(false)
				))
	}

	const handleDontSaveName = () =>
		state.isNew ? context.handleRemoveBoard(state) : (
				handleUpdate('name', initialName),
				setInitialUpdateName(false)
			)

	const handleRemoveBoard = () => confirm('Are you sure ?') && (
		setProcess([...process, context.handleRemoveBoard]),
		context.handleRemoveBoard(state)
			.then()
			.catch(err => (
				setProcess(_without(process, context.handleRemoveBoard)),
				console.error(err)
			))
	)

	const handleHideBoard = () => confirm('Are you sure ?') && (
		setProcess([...process, context.handleUpdateBoard]),
		context.handleUpdateBoard({ entity_id: state.entity_id, hide: true })
			.then()
			.catch(err => (
				setProcess(_without(process, context.handleUpdateBoard)),
				console.error(err)
			))
	)


	return (
		<Flex sx={props.sx} flexDirection="column">
			<Flex px="1.2rem" height="5rem" alignItems="center">
				<Flex mr="1rem">
					{!initialUpdateName &&
						<Text onDoubleClick={() => setInitialUpdateName(true)} sx={{ width: '18rem' }}>{state.name}</Text> ||
						<Input value={state.name} onChange={value => handleUpdate('name', value)} focus={initialUpdateName} onKeyEnter={handleSave} onKeyEscape={handleDontSaveName} sx={{ width: '18rem' }} />
					}
				</Flex>
				<Flex width="5rem" justifyContent="center">
					{!initialUpdateName &&
						<Dropdown toggle={
							<Button background={themeContext.mixin.icons.burger.main} />
						}>
							<Dropdown.Button onClick={() => setInitialUpdateName(true)}>Edit name</Dropdown.Button>
							<Dropdown.Button onClick={handleHideBoard}>Hide</Dropdown.Button>
							<Dropdown.Button onClick={handleRemoveBoard} sx={{ color: themeContext.colors.default.bg.red }}>Remove</Dropdown.Button>
						</Dropdown> ||
						<>
							<Button disabled={disabledSaveName} onClick={handleSave} agree sx={{ mr: '.5rem' }} />
							<Button disabled={disabledDontSaveName} onClick={handleDontSaveName} delete />
						</>
					}
				</Flex>
			</Flex>
			<Loader active={process.length > 0} />
		</Flex>
	)
}

export default Header

export const Skeleton = props => (
	<Flex sx={props.sx} flexDirection="column">
		<Flex px="1.2rem" height="5rem" alignItems="center">
			<Flex mr="1rem">
				<UISkeleton width="18rem" height="3rem" sx={{ alignSelf: 'center' }} />
			</Flex>
			<Flex width="5rem" justifyContent="center">
				<UISkeleton width="2rem" height="2rem" />
			</Flex>
		</Flex>
		<Loader />
	</Flex>
)