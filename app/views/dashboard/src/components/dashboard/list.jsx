import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { values as _values, isEmpty as _isEmpty } from 'lodash'
import { ThemeContext } from 'styled-components'

import { Flex, Box } from 'reflexbox'
import { Text, Button, Skeleton as UISkeleton } from 'ui'

export const Component = props => {
	const themeContext = useContext(ThemeContext)
	const dashboard = useSelector(state => state.dashboard)

	const [showTask, setShowTask] = useState(false)
	const [sections, setSections] = useState(_values(dashboard.sections))

	useEffect(() => {
		setSections(_values(dashboard.sections))
	}, [dashboard.sections])

	return (
		<Flex width={[1]} justifyContent={showTask && 'initial' || 'center'}>
			<Box width={[0.7]} p="1rem 1rem" sx={{ boxShadow: '2px 0 15px #555' }}>
				<Box width={[1]} mb="2rem">
					{
						_isEmpty(sections) && <Text styles={themeContext.text.styles.placeholder} style={{ width: '100%' }}>list is empty</Text> ||
						<Text styles={themeContext.text.styles.placeholder} style={{ width: '100%' }}>list tasks</Text>
					}
				</Box>
				<Flex width={[1]} justifyContent="center">
					<Button styles={themeContext.button.styles.accent} sx={{ width: '20rem', height: '4rem' }}>Add section +</Button>
				</Flex>
			</Box>
		</Flex>
	)
}

export const Skeleton = props => (
	<Flex width={[1]} justifyContent="center">
		<Box width={[0.7]} p="1rem 1rem" sx={{ boxShadow: '2px 0 15px #555' }}>
			<Flex flexDirection="column">
				<UISkeleton width={[.83]} height="2rem" mb="1rem" />
				<UISkeleton width={[.7]} height="2rem" mb="1rem" />
				<UISkeleton width={[.88]} height="2rem" mb="1rem" />
				<UISkeleton width={[.5]} height="2rem" mb="1rem" />
				<UISkeleton width={[.6]} height="2rem"/>
			</Flex>
		</Box>
	</Flex>
)

export default Component
