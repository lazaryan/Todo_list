import { useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Flex, Box } from 'reflexbox'
import { Text, Input, Icon, Button, Skeleton as UISkeleton } from 'ui'
import { ThemeContext } from 'styled-components'

import { updateDashboard } from '../actions/dashboard'
import { UPDATE_DASHBOARD } from '../actions/dashboard/types'

export const Component = props => {
	const dispatch = useDispatch()
	const themeContext = useContext(ThemeContext)

	const app = useSelector(state => state.app)
	const dashboard = useSelector(state => state.dashboard)

	const [initialUpdateName, setInitialUpdateName] = useState(!Boolean(dashboard.name))
	const [disabledUpdate] = useState(app.user.access != app.data.access[1])

	const handleUpdate = (field, value) =>
		dispatch({
			type: UPDATE_DASHBOARD,
			payload: { [field]: value }
		})

	const handleSendUpdate = (field, value) =>
		dispatch(updateDashboard({
			entity_id: dashboard.entity_id,
			[field]: value
		}))

	const handleSaveName = value => value && (
		handleSendUpdate('name', value),
		setInitialUpdateName(false)
	)

	return (
		<Flex justifyContent="space-between" alignItems="center" height="100%">
			<Flex>
				<Button mr="1rem" disabled={true}>Home</Button>
				<Button mr="2rem" disabled={true}>Boards</Button>
				{(!initialUpdateName || disabledUpdate) &&
					<Flex px="1rem" alignItems="center" sx={{ border: `1px solid ${themeContext.colors.default.border.main}`, cursor: !disabledUpdate ? 'pointer' : 'default' }}>
						<Text onClick={() => !disabledUpdate && setInitialUpdateName(true)} styles={themeContext.text.styles.label} sx={{ lineHeight: '1.6rem' }}>{dashboard.name || 'dashboard name'}</Text>
					</Flex> ||
					<Input value={dashboard.name} onChange={value => handleUpdate('name', value)} onBlur={handleSaveName} onKeyEnter={handleSaveName} focus={true} placeholder="write dashboard name..." styles={themeContext.input.styles.accent} sx={{ width: '20rem' }} />
				}
			</Flex>
			<Flex alignItems="center">
				{app.user && <Text sx={{ mr: '2rem' }}>{app.user.name}</Text>}
				<Box sx={{ overflow: 'hidden', borderRadius: '50%', cursor: 'pointer', border: `1px solid ${themeContext.colors.default.border.main}` }}>
					<Icon width="3rem" height="3rem" background={app.user.photo || themeContext.mixin.icons.account.main} sx={{ backgroundPosition: '0 8px' }} />
				</Box>
			</Flex>
		</Flex>
	)
}

export const Skeleton = props => (
	<Flex justifyContent="space-between" alignItems="center" height="100%">
		<Flex>
			<UISkeleton width="3rem" height="2rem" mr="1rem"/>
			<UISkeleton width="3rem" height="2rem" mr="2rem"/>
			<UISkeleton width="15rem" height="2rem" mr="1rem"/>
		</Flex>
		<Flex alignItems="center">
			<UISkeleton width="12rem" height="2rem" mr="1rem"/>
			<UISkeleton width="3rem" height="3rem" sx={{ borderRadius: '50%' }} />
		</Flex>
	</Flex>
)

export default Component
