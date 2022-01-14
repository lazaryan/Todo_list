import React from 'react'

import { Flex } from 'reflexbox'
import { Container, Skeleton as UISkeleton } from 'ui'

export const Component = () => {
    return (
        <Flex mb="1rem">
            <Container sx={{ width: '100%' }}>
                <Container.Tile>
                    Task
                </Container.Tile>
            </Container>
        </Flex>
    )
}

export const Skeleton = () => <UISkeleton width="100%" height="3rem" mb="1rem" />

export default Component