import { useState } from 'react'

import { Flex } from 'reflexbox'
import { Text, Input, Button, Skeleton as UISkeleton } from 'ui'

export const Component = props => {
	const [state, setState] = useState(props.item || {})

	return (
		<Flex sx={props.sx}>
			<Flex height="max-content" flexDirection="column" sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', boxShadow: '2px 0 15px #ccc', overflow: 'hidden' }}>
				<Flex px="1.2rem" height="5rem" bg="#fafafa">
					<Input value={state.name} sx={{ width: '18rem' }} />
				</Flex>
				<Flex flexDirection="column" alignItems="center" pt="1rem">
					<Text>task list</Text>
					<Flex pt="1rem" pb=".5rem" justifyContent="center">
						<Button>Add task +</Button>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export const Skeleton = props => (
	<Flex sx={props.sx}>
		<Flex height="max-content" flexDirection="column" sx={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', boxShadow: '2px 0 15px #ccc', overflow: 'hidden' }}>
			<Flex px="1.2rem" height="5rem" bg="#fafafa">
				<UISkeleton width="18rem" height="3rem" sx={{ alignSelf: 'center' }} />
			</Flex>
			<Flex flexDirection="column" alignItems="center" pt="1rem">
				{[...Array(props.count || 2)].map((item, index) =>
					<UISkeleton key={index} width="18rem" height="4rem" mb=".5rem" />
				)}
				<Flex pt="1rem" pb=".5rem" justifyContent="center">
					<UISkeleton width="12rem" height="3rem" />
				</Flex>
			</Flex>
		</Flex>
	</Flex>
)

export default Component
