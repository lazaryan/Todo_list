import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Flex } from 'reflexbox'
import { Popup, Button, Input, Loader } from 'ui'
import { ThemeContext } from 'styled-components'

import { createTask } from '../../../actions/dashboard'

export const Component = props => {
	const themeContext = useContext(ThemeContext)
	const dispatch = useDispatch()

	const [state, setState] = useState(props.item)
	const [process, setProcess] = useState([])

	const handleClose = () => props.onExit && props.onExit()

	const handleUpdate = (field, value) => setState(prevState => ({
		...prevState,
		[field]: value
	}))

	const handleCreate = () => (
		setProcess([...process, createTask]),
		dispatch(createTask(state))
			.then(handleClose)
			.catch(console.error)
	)

	return (
		<Popup>
			<Popup.Header justifyContent="space-between">
				<Input placeholder="Write task name..." onChange={value => handleUpdate('name', value)} styles={themeContext.input.styles.accent} sx={{ width: '80%' }} />
				<Flex ml="3rem">
					<Button sx={{ mr: '1rem' }} onClick={handleClose} styles={themeContext.button.styles.unaccent}>Close</Button>
					{props.create && 
						<Button onClick={handleCreate} styles={themeContext.button.styles.accent}>Create</Button> ||
						<Button styles={themeContext.button.styles.accent}>Done</Button>
					}
				</Flex>
			</Popup.Header>
			<Loader active={process.includes(createTask)} />
			<Popup.Content>
			</Popup.Content>
		</Popup>
	)
}

export default Component
