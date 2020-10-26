import React from 'react'

import { Flex } from 'reflexbox'
import { Skeleton as UISkeleton } from 'ui'

export const Component = () => {
    return (
        <Flex>task</Flex>
    )
}

export const Skeleton = () => <UISkeleton width="100%" height="3rem" mb="1rem" />

export default Component