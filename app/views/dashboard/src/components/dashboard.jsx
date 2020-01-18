import { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pull as _pull } from 'lodash'

import { Flex } from 'reflexbox'
import { Skeleton as UISkeleton } from 'ui'

import { setSections, removeSection as actionRemoveSection, setTasks } from '../actions/dashboard'

import List, { Skeleton as ListSkeleton } from './dashboard/list'
import Dashboard, { Skeleton as DashboardSkeleton } from './dashboard/dashboard'

import Context from './dashboard/context'

export const Component = props => {
	const dispatch = useDispatch()

	const context = useContext(Context)

	const dashboard = useSelector(state => state.dashboard)

	const [initialised, setInitialised] = useState()
	const [process, setProcess] = useState([setSections, setTasks])

	useEffect(() => {
		dispatch(setSections(dashboard.entity_id))
			.then(() => (
				setProcess([..._pull(process, setSections)])
			))
			.catch(console.error)

		dispatch(setTasks(dashboard.entity_id))
			.then(() => (
				setProcess([..._pull(process, setTasks)])
			))
			.catch(console.error)
	}, [])

	useEffect(() => {
		!process.length && setInitialised(true)
	}, [process])

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