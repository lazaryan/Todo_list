import React from 'react'
import { useDispatch } from 'react-redux'

import { Flex } from 'reflexbox'
import { Container, Text, Dropdown, Icon, Button, Input, Skeleton as UISkeleton } from 'ui'
import Task, { Skeleton as TaskSkeleton } from './task'

import { Column } from '../../reducers/dashboard'

import { updateColumnName, deleteColumn } from '../../actions/dashboard'

import theme from 'theme'

export interface Props {
    column: Column
}

export type HeaderState = 'initial' | 'editName'

export const Component = (props: Props) => {
    const dispatch = useDispatch()

    const [headerState, setHeaderState]: [HeaderState, Function] = React.useState('initial')
    const [queryDashboardName, setQueryDashboardName]: [string, Function] = React.useState(props.column.name || '')
    const [processUpdateName, setProcessUpdateName]: [boolean, Function] = React.useState(false)
    const [processDeleteColumn, setProcessDeleteColumn]: [boolean, Function] = React.useState(false)

    React.useEffect(() => {
        setQueryDashboardName(props.column.name || '')
    }, [props.column.name])

    const handleUpdateDashboardName = () => {
        setProcessUpdateName(true)
        dispatch(updateColumnName({ name: queryDashboardName, id: props.column.entity_id }))
            .then(() => {
                setHeaderState('initial')
            })
            .catch(console.error)
            .finally(() => setProcessUpdateName(false))
    }

    const handleCliseUpdatingName = () => {
        setQueryDashboardName(props.column.name || '')
        setHeaderState('initial')
    }

    const handleDeleteColumn = () => {
        setProcessDeleteColumn(true)
        dispatch(deleteColumn({ id: props.column.entity_id }))
            .then(console.log)
            .catch(console.error)
    }

    return (
        <Container sx={{ width: '25rem' }}>
            <Container.Header sx={{ justifyContent: 'space-between' }}>
                {headerState === 'initial'
                    ? <>
                        <Text className="overflow-text" styles={theme.text.styles.label} sx={{ width: '80%' }}>{props.column.name || 'Без названия...'}</Text>
                        <Dropdown toggle={
                            <Icon background={theme.mixin.icons.light.menu}/>
                        }>
                            <Dropdown.Button onClick={() => setHeaderState('editName')}>Изменить имя</Dropdown.Button>
                            <Dropdown.Button disabled={processDeleteColumn} onClick={handleDeleteColumn}>Удалить</Dropdown.Button>
                        </Dropdown>
                    </>
                    : null
                }
                {headerState === 'editName'
                    ? <Flex justifyContent="space-between" alignItems="center">
                        <Input sx={{ width: '70%', mr: '.5rem' }} value={queryDashboardName} onChange={(value: string) => setQueryDashboardName(value)} placeholder="Введите имя..."/>
                        <Flex>
                            <Button disabled={processUpdateName} background={theme.mixin.icons.green.save} sx={{ mr: '.5rem' }} onClick={handleUpdateDashboardName}/>
                            <Button disabled={processUpdateName} background={theme.mixin.icons.red.close} onClick={handleCliseUpdatingName}/>
                        </Flex>
                    </Flex>
                    : null
                }
            </Container.Header>
            <Container.Content>
                <TaskSkeleton />
                <TaskSkeleton />
                <TaskSkeleton />
            </Container.Content>
        </Container>
    )
}

export const Skeleton = (props) => (
    <Container sx={{ width: '25rem' }}>
        <Container.Header>
            <UISkeleton width="80%" />
        </Container.Header>
        <Container.Content>
            {Array.from({ length: props.tasks }).map((_, index) =>
                <TaskSkeleton key={index} />
            )}
        </Container.Content>
    </Container>
)

Skeleton.defaultProps = {
    tasks: 3
}

export default Component
