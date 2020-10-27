import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Flex } from 'reflexbox'
import { Container, Text, Dropdown, Icon, Button, Input, Skeleton as UISkeleton } from 'ui'
import Task, { Skeleton as TaskSkeleton } from './task'

import { Column } from '../../reducers/dashboard'

import { updateColumnName, deleteColumn, getColumns, getTasks, createTask } from '../../actions/dashboard'

import theme from 'theme'

import { Task as TaskInterface } from '../../reducers/dashboard'
import { Store } from '../../reducers'

export interface Props {
    column: Column
}

export type HeaderState = 'initial' | 'editName'

export const Component = (props: Props) => {
    const dispatch = useDispatch()
    const tasks: TaskInterface[] = useSelector((state: Store) => state.dashboard.tasks)

    const columnTasks = React.useMemo(() => tasks.filter(task => task.column_id == props.column.entity_id), [tasks, props.column])

    const [headerState, setHeaderState]: [HeaderState, Function] = React.useState('initial')
    const [queryDashboardName, setQueryDashboardName]: [string, Function] = React.useState(props.column.name || '')
    const [processUpdateName, setProcessUpdateName]: [boolean, Function] = React.useState(false)
    const [processDeleteColumn, setProcessDeleteColumn]: [boolean, Function] = React.useState(false)
    const [processGetTasks, setProcessGetTasks]: [boolean, Function] = React.useState(true)
    const [processCreateTask, setProcessCreateTask]: [boolean, Function] = React.useState(false)

    React.useEffect(() => {
        dispatch(getTasks({ id: props.column.entity_id }))
            .then(() => setProcessGetTasks(false))
    }, [])

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
        confirm('Вы уверены?') && (
            setProcessDeleteColumn(true),
            dispatch(deleteColumn({ id: props.column.entity_id }))
                .then(console.log)
                .catch(console.error)
        )
    }

    const handleCreateTask = () => {
        setProcessCreateTask(true)
        dispatch(createTask({ id: props.column.entity_id }))
            .finally(() => {
                setProcessCreateTask(false)
            })
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
                {processGetTasks ? <TasksSkeleton /> :
                    columnTasks.map(task =>
                        <Task key={task.entity_id} task={task} />
                    )
                }
                <Flex justifyContent="center">
                    <Button disabled={processCreateTask} onClick={handleCreateTask}>Создать задачу</Button>
                </Flex>
            </Container.Content>
        </Container>
    )
}

export const TasksSkeleton = () => (
    <>
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
        <Flex justifyContent="center">
            <UISkeleton width="60%" height="3rem" />
        </Flex>
    </>
)

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
