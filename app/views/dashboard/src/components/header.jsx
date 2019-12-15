import { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Flex, Box } from 'reflexbox'
import { Text, Input, Skeleton as UISkeleton } from 'ui'
import { ThemeContext } from 'styled-components'

import { access } from 'utils'

export const Component = props => {
	const themeContext = useContext(ThemeContext)

	const app = useSelector(state => state.app)
	const dashboard = useSelector(state => state.dashboard)

	const [initialUpdateName, setInitialUpdateName] = useState()
	const [userAccess] = useState(app.user.access ? access[app.user.access] : access[4])

	const handleInitialUpdateName = () => userAccess == access[1] && setInitialUpdateName(true)

	const handleUpdateName = value => (
		setInitialUpdateName(false)
	)

	return (
		<Flex justifyContent="space-between" alignItems="center" width="[1]" height="100%">
			<Flex>
				{!initialUpdateName &&
					<Box p=".5rem 1rem" sx={{ border: `1px solid ${themeContext.colors.default.border.main}`, cursor: userAccess == access[1] ? 'pointer' : 'default' }}>
						<Text onClick={handleInitialUpdateName} styles={themeContext.text.styles.label}>{dashboard.name}</Text>
					</Box> ||
					<Input value={dashboard.name} onBlur={handleUpdateName} focus={true} styles={themeContext.input.styles.accent} sx={{ py: '.3rem', width: '20rem' }} />
				}
			</Flex>
			<Flex>
				<Text>{app.user.name}</Text>
			</Flex>
		</Flex>
	)
}

export const Skeleton = props => (
	<Flex justifyContent="space-between" alignItems="center" width="[1]" height="100%">
		<Flex>
			<UISkeleton width="3rem" height="2rem" mr="1rem"/>
			<UISkeleton width="3rem" height="2rem" mr="2rem"/>
			<UISkeleton width="15rem" height="2rem" mr="1rem"/>
		</Flex>
		<Flex>
			<UISkeleton width="12rem" height="2rem" mr="1rem"/>
			<UISkeleton width="2rem" height="2rem" sx={{ borderRadius: '50%' }} />
		</Flex>
	</Flex>
)

export default Component
