import { useContext } from 'react'
import { Flex } from 'reflexbox'
import { Popup, Button, Input } from 'ui'
import { ThemeContext } from 'styled-components'

export const Component = props => {
	const themeContext = useContext(ThemeContext)

	const handleClose = () => props.onExit && props.onExit()

	const handleCreate = () => {}

	return (
		<Popup>
			<Popup.Header justifyContent="space-between">
				<Input placeholder="Write task name..." styles={themeContext.input.styles.accent} sx={{ width: '100%' }} />
				<Flex ml="3rem">
					<Button sx={{ mr: '1rem' }} onClick={handleClose} styles={themeContext.button.styles.unaccent}>Close</Button>
					{props.create && 
						<Button onClick={handleCreate} styles={themeContext.button.styles.accent}>Create</Button> ||
						<Button styles={themeContext.button.styles.accent}>Done</Button>
					}
				</Flex>
			</Popup.Header>
		</Popup>
	)
}

export default Component
