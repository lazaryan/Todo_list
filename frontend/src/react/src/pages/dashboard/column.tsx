import React from 'react'

import { Flex } from 'reflexbox'
import { Container, Text, Skeleton as UISkeleton } from 'ui'

import { Column } from '../../reducers/dashboard'

export interface Props {
    column: Column
}

export const Component = (props: Props) => {
    return (
        <Container sx={{ width: '25rem' }}>
            <Container.Header>
                <UISkeleton width="80%" />
            </Container.Header>
            <Container.Content>
                
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
                <UISkeleton key={index} width="100%" height="3rem" mb="1rem" />
            )}
        </Container.Content>
    </Container>
)

Skeleton.defaultProps = {
    tasks: 3
}

export default Component
