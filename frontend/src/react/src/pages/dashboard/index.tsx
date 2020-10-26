import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { Flex, Box } from 'reflexbox'
import { Button, Skeleton as UISkeleton } from 'ui'

import { Store as DashboardStore } from '../../reducers/dashboard'

import { getDashboard, getColumns, createColumn } from '../../actions/dashboard'
import { SET_DASHBOARD } from '../../actions/dashboard/types'

import Column, { Skeleton as ColumnSkeleton } from './column'

export const Component = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const dashboardState: DashboardStore = useSelector(state => state.dashboard)

    const [intialize, setInitialize]: [boolean, Function] = React.useState(false)
    const [processAddColumn, setProcessAddColumn]: [boolean, Function] = React.useState(false)

    React.useEffect(() => {
        const id = location.pathname.match('/([^/]*$)')[1]

        if (id) {
            dispatch(getDashboard(id))
                .then(() => {
                    dispatch(getColumns())
                        .then(() => setInitialize(true))
                })
        }

        return () => dispatch({ type: SET_DASHBOARD, payload: undefined })
    }, [])

    const handleCreateColumn = () => {
        setProcessAddColumn(true)
        dispatch(createColumn())
            .then(console.log)
            .catch(console.error)
            .finally(() => setProcessAddColumn(false))
    }

    const handleDisabledAddColumn = React.useMemo(() => dashboardState.columns?.length && dashboardState.columns.length >= 3, [dashboardState.columns])

    console.log(dashboardState)

    return (
        <Flex>
            {!intialize
            ? <Skeleton />
            : <>
                {dashboardState.columns?.length ?
                    dashboardState.columns.map(column =>
                        <Flex key={column.entity_id} mr="2rem">
                            <Column column={column} /> 
                        </Flex>
                    )
                : null}
                <Box>
                    <Button
                        disabled={handleDisabledAddColumn || processAddColumn}
                        onClick={handleCreateColumn}
                        isProcessing={processAddColumn}
                    >Добавить колонку</Button>
                </Box>
            </>
            }
        </Flex>
    )
}

export const Skeleton = () => (
    <Flex>
        <Flex mr="2rem"><ColumnSkeleton tasks={3} /></Flex>
        <Flex mr="2rem"><ColumnSkeleton tasks={2} /></Flex>
        <Flex mr="2rem"><ColumnSkeleton tasks={5} /></Flex>
        <Box>
            <UISkeleton width="10rem" height="2rem" />
        </Box>
    </Flex>
)

export default Component
