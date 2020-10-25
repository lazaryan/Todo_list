import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'

import { Flex } from 'reflexbox'

import { Store as DashboardStore } from '../../reducers/dashboard'

import { getDashboard } from '../../actions/dashboard'
import { SET_DASHBOARD } from '../../actions/dashboard/types'

export const Component = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    React.useEffect(() => {
        const id = location.pathname.match('/([^/]*$)')[1]

        if (id) {
            dispatch(getDashboard(id))
                .then(console.log)
        }

        return () => dispatch({ type: SET_DASHBOARD, payload: undefined })
    }, [])

    return (
        <Flex>dashboard</Flex>
    )
}

export const Skeleton = () => (
    <Flex>
        gfkhjfgklhjgfkhjfglk
    </Flex>
)

export default Component
