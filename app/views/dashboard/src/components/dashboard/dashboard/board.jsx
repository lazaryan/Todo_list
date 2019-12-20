import { useState } from 'react'

import { Flex } from 'reflexbox'
import { Text } from 'ui'

export const Component = props => {
	const [state, setState] = useState(props.item || {})

	return (
		<Flex sx={props.sx}>
			<Flex height="max-content" sx={{ border: '1px solid #555' }}>
				<Text>{state.name}</Text>
			</Flex>
		</Flex>
	)
}

export default Component
