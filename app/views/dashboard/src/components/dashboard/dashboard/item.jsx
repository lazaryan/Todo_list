import { useState } from 'react'

import { Text } from 'ui'
import { Flex } from 'reflexbox'

export const Item = props => {
	const [state] = useState(props.item || {})

	return (
		<Flex flexDirection="column">
			<Text>{state.name}</Text>
		</Flex>
	)
}

export default Item