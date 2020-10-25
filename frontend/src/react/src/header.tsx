import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'

import { Flex } from 'reflexbox'
import theme from 'theme'
import { Container, Button, Icon, Text, Input, Skeleton as UISkeleton } from 'ui'

import { Store as AppStore } from './reducers/app'
import { Store as DashboardStore } from './reducers/dashboard'

export const Component = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    const appState: AppStore = useSelector((state) => state.app)
    const dashboardState: DashboardStore = useSelector((state) => state.dashboard)

    const [initialUpdateDashboardName, setInitialUpdateDashboardName]: [boolean, Function] = React.useState(false)

    React.useEffect(() => {
        setInitialUpdateDashboardName(false)
    }, [location])

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
                                    <Input placeholder="Введите имя.." sx={{ mr: '2rem', width: '20rem' }}/>
                                    <Button styles={theme.button.styles.accent} sx={{ mr: '2rem' }}>Сохранить</Button>
                                    <Button styles={theme.button.styles.close}>Закрыть</Button>
                                </Flex>
                                : <Text onClick={() => setInitialUpdateDashboardName(true)} styles={theme.text.styles.box} sx={{ maxWidth: '20rem' }}>{ dashboardState.dashboard.name || 'Введите имя...' }</Text>
                        : <UISkeleton width="15rem" height="2rem" mr="1rem"/>}
                    </>
                    : null}
                </Flex>
                <Flex alignItems="center">
                    <Text styles={theme.text.styles.placeholder} sx={{ mr: '1rem' }}>{ appState?.user?.name ?? '' }</Text>
                    <Icon background={theme.mixin.icons.blue.user} />
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