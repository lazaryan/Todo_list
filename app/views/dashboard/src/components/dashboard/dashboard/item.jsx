import { useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { Flex } from 'reflexbox'
import { Text, Button, Skeleton as UISkeleton } from 'ui'

export const Item = props => {
	const themeContext = useContext(ThemeContext)

	const item = props.item || {}

	const handleEditTask = () => props.onSelect && props.onSelect(item)

	return (
		<Flex sx={props.sx} width={[.9]}>
			<Flex alignItems="center" mb="1rem" width={[1]} sx={{ borderBottom: `1px solid ${themeContext.colors.default.border.main}` }}>
				<Button agree sx={{ mr: '2rem', backgroundColor: !item.completed && themeContext.colors.default.bg.dark }} />
				<Text sx={{ lineHeight: '3rem' }}>{item.name}</Text>
				<Button onClick={handleEditTask}>Edit</Button>
			</Flex>
		</Flex>
	)
}

export const Skeleton = props => (
	<UISkeleton height="3rem" width={[.9]} mb="1rem" {...props} />
)

export default Item