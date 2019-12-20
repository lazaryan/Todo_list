import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Flex } from 'reflexbox'
import { Skeleton as UISkeleton } from 'ui'

import { setSections } from '../actions/dashboard'

import List, { Skeleton as ListSkeleton } from './dashboard/list'
import Dashboard, { Skeleton as DashboardSkeleton } from './dashboard/dashboard'

export const Component = props => {
	const dispatch = useDispatch()

	const dashboard = useSelector(state => state.dashboard)

	const [initialised, setInitialised] = useState(false)

	useEffect(() => {
		dispatch(setSections())
			.then(() => setInitialised(true))
			.catch(console.error)
	}, [])

	return (
		<Flex width={[1]} height="100%">
			{!initialised &&
				<>
					{(!dashboard.style || dashboard.style === 'default') && <DashboardSkeleton />}
					{dashboard.style === 'list' && <ListSkeleton />}
				</> ||
				<>
					{(!dashboard.style || dashboard.style === 'default') && <Dashboard />}
					{dashboard.style === 'list' && <List />}
				</>
			}
		</Flex>
	)
}

export const Skeleton = props => (
	<Flex pt="2rem" pl="4rem" flexDirection="column">
		<UISkeleton width="70%" height="2rem" mb="1rem" />
		<UISkeleton width="50%" height="2rem" mb="1rem" />
		<UISkeleton width="65%" height="2rem" mb="1rem" />
	</Flex>
)

export default Component