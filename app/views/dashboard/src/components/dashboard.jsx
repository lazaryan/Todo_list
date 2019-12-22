import { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Flex } from 'reflexbox'
import { Skeleton as UISkeleton } from 'ui'

import { setSections, removeSection as actionRemoveSection } from '../actions/dashboard'

import List, { Skeleton as ListSkeleton } from './dashboard/list'
import Dashboard, { Skeleton as DashboardSkeleton } from './dashboard/dashboard'

import Context from './dashboard/context'

export const Component = props => {
	const dispatch = useDispatch()

	const context = useContext(Context)

	const dashboard = useSelector(state => state.dashboard)

	const [initialised, setInitialised] = useState(false)

	useEffect(() => {
		dispatch(setSections())
			.then(() => (
				setInitialised(true)),
				context.initialised = true
			)
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
	</Flex>
)

export default Component