import { useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { Flex } from 'reflexbox'
import { Text, Skeleton as UISkeleton } from 'ui'

export const Item = props => {
	const themeContext = useContext(ThemeContext)

	const [item] = useState(props.item || {})

	return (
		<Flex sx={props.sx} width={[.9]}>
			<Flex flexDirection="column" mb="1rem" width={[1]} sx={{ borderBottom: `1px solid ${themeContext.colors.default.border.main}` }}>
				<Text sx={{ lineHeight: '3rem' }}>{item.name}</Text>
			</Flex>
		</Flex>
	)
}

export const Skeleton = props => (
	<UISkeleton height="3rem" width={[.9]} mb="1rem" {...props} />
)

export default Item