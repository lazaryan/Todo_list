import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'

import { Flex } from 'reflexbox'
import theme from 'theme'
import { Container, Button, Icon, Text, Input, Dropdown, Skeleton as UISkeleton } from 'ui'

import { Store as AppStore } from './reducers/app'
import { Store as DashboardStore } from './reducers/dashboard'

import { updateDashboardName } from './actions/dashboard'
import { logout } from './actions/app'

export const Component = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const appState: AppStore = useSelector((state) => state.app)
    const dashboardState: DashboardStore = useSelector((state) => state.dashboard)

    const [initialUpdateDashboardName, setInitialUpdateDashboardName]: [boolean, Function] = React.useState(false)
    const [queryUpdateDashboardName, setQueryUpdateDashboardName]: [string, Function] = React.useState(dashboardState.dashboard?.name || '')
    const [processUpdateDashboardName, setProcessUpdateDashboardName]: [boolean, Function] = React.useState(false)

    React.useEffect(() => {
        setInitialUpdateDashboardName(false)
    }, [location])

    React.useEffect(() => {
        setQueryUpdateDashboardName(dashboardState.dashboard?.name || '')
    }, [dashboardState.dashboard])

    const saveChangeDashboardName = () => {
        setProcessUpdateDashboardName(true)

        dispatch(updateDashboardName({ id: dashboardState.dashboard.dashboard_id, name: queryUpdateDashboardName }))
            .catch(console.error)
            .finally(() => {
                setInitialUpdateDashboardName(false)
                setProcessUpdateDashboardName(false)
            })
    }

    const closeChangingDahboardName = () => {
        setInitialUpdateDashboardName(false)
        setQueryUpdateDashboardName('')
    }

    const handleLogout = () => {
        dispatch(logout())
            .then(() => {
                window.location.pathname = '/login'
            })
    }

    console.log(dashboardState)

    return (
        <Container sx={{ width: '100%', mb: '3rem', zIndex: '10' }}>
            <Container.Header sx={{ justifyContent: 'space-between' }} style={{ borderRadius: '0' }}>
                <Flex alignItems="center">
                    {location.pathname !== '/' ?
                    <>
                        <Button onClick={() => history.push('/')} sx={{ mr: '2rem' }}>На главную</Button>
                        {dashboardState.dashboard ?
                            initialUpdateDashboardName
                                ? <Flex>
                                    <Input placeholder="Введите имя.." sx={{ mr: '2rem', width: '20rem' }} value={queryUpdateDashboardName} onChange={(value: string) => setQueryUpdateDashboardName(value)}/>
                                    <Button
                                        onClick={saveChangeDashboardName}
                                        styles={theme.button.styles.accent} sx={{ mr: '2rem' }}
                                        disabled={processUpdateDashboardName}
                                        isProcessing={processUpdateDashboardName}
                                    >Сохранить</Button>
                                    <Button
                                        onClick={closeChangingDahboardName}
                                        styles={theme.button.styles.close}
                                        disabled={processUpdateDashboardName}
                                        isProcessing={processUpdateDashboardName}
                                    >Закрыть</Button>
                                </Flex>
                                : <Text onClick={() => setInitialUpdateDashboardName(true)} styles={theme.text.styles.box} sx={{ maxWidth: '20rem' }}>{ dashboardState.dashboard.name || 'Введите имя...' }</Text>
                        : <UISkeleton width="15rem" height="2rem" mr="1rem"/>}
                    </>
                    : null}
                </Flex>
                <Flex alignItems="center">
                    <Text styles={theme.text.styles.placeholder} sx={{ mr: '1rem' }}>{ appState?.user?.name ?? '' }</Text>
                    <Dropdown toggle={
                        <Icon background={theme.mixin.icons.blue.user} />
                    }>
                        <Dropdown.Button onClick={handleLogout}>Выйти</Dropdown.Button>
                    </Dropdown>
                </Flex>
            </Container.Header>
        </Container>
    )
}

export const Skeleton = () => (
    <Container sx={{ width: '100%', mb: '3rem', zIndex: '10' }}>
        <Container.Header sx={{ justifyContent: 'space-between' }} style={{ borderRadius: '0' }}>
            <Flex>
                <UISkeleton width="3rem" height="2rem" mr="1rem"/>
                <UISkeleton width="15rem" height="2rem" mr="1rem"/>
            </Flex>
            <Flex alignItems="center">
                <UISkeleton width="12rem" height="2rem" mr="1rem"/>
                <UISkeleton width="3rem" height="3rem" sx={{ borderRadius: '50%' }} />
            </Flex>
        </Container.Header>
    </Container>
)

export default Component