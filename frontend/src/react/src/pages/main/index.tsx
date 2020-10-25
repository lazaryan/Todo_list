import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Flex } from 'reflexbox'
import { Skeleton as UISkeleton } from 'ui'

import { getDashboards, createDashboard, deleteDashboard } from '../../actions/main'
import { Store, Dashboard } from '../../reducers/main'

import { Container, Text, Button } from 'ui'

import theme from 'theme'

export const Component = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const state: Store = useSelector(state => state.main)

    const [initial, setInitial] = React.useState(false)

    React.useEffect(() => {
        dispatch(getDashboards())
            .then(() => setTimeout(() => setInitial(true), 300))
    }, [])

    const showDashboard = (dashboardId: string) => history.push(`/dashboard/${dashboardId}`)

    const create = () => {
        dispatch(createDashboard())
            .then(({ data }) => {
                if (data) {
                    showDashboard(data)
                }
            })
            .catch(console.error)
    }

    const closeDashboard = (dashboardId: string) => (
        confirm('Вы уверены?') && (
            dispatch(deleteDashboard(dashboardId))
                .then(console.log)
        )
    )

    console.log(state)

    return (
        <Flex width="100%" flexDirection="column">
            {(!initial || !state.items?.length) ?
                <Container sx={{ width: '100%', mb: '2rem' }}>
                    <Container.Tile sx={{justifyContent: 'center' }}>
                        <Text styles={theme.text.styles.placeholder}>Вы еще не создали ни одной доски</Text>
                    </Container.Tile>
                </Container>
            : state.items.map((dashboard: Dashboard) =>
                <Container key={dashboard.dashboard_id} sx={{ width: '100%', mb: '2rem' }}>
                    <Container.Tile sx={{justifyContent: 'center', flexDirection: 'column' }}>
                        <Text styles={theme.text.styles.header} sx={{ mb: '1.5rem' }}>{ dashboard.name || 'Доска без названия' }</Text>
                        <Flex>
                            <Button onClick={() => showDashboard(dashboard.dashboard_id)} sx={{ mr: '2rem' }}>Перейти</Button>
                            <Button onClick={() => closeDashboard(dashboard.dashboard_id)} styles={theme.button.styles.close}>Закрыть доску</Button>
                        </Flex>
                    </Container.Tile>
                </Container>
            )}
            <Flex justifyContent="flex-end">
                <Button onClick={create}>Создать</Button>
            </Flex>
        </Flex>
    )
}

export const Skeleton = () => (
    <Flex width="100%" flexDirection="column">
        <UISkeleton width="100%" height="20rem" mb="2rem" />
        <UISkeleton width="100%" height="20rem" mb="2rem" />
    </Flex>
)

export default Component
