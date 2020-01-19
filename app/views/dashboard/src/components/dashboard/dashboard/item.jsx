import { useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { without as _without } from 'lodash'

import { Flex } from 'reflexbox'
import { Text, Button, Skeleton as UISkeleton } from 'ui'

import Context from '../context'

export const Item = props => {
	const themeContext = useContext(ThemeContext)
	const context = useContext(Context)

	const [process, setProcess] = useState([])

	const item = props.item || {}

	const handleEditTask = () => props.onSelect && props.onSelect(item)

	const handleUpdateCompleted = () => (
		setProcess([...process, context.handleUpdateTask]),
		context.handleUpdateTask({
			entity_id: item.entity_id,
			section_id: item.section_id,
			completed: !item.completed
		}).then(() => setProcess(_without(process, context.handleUpdateTask)))
	)

	return (
		<Flex sx={props.sx} width={[.9]}>
			<Flex alignItems="center" mb=".5rem" width={[1]} sx={{ borderBottom: `1px solid ${themeContext.colors.default.border.main}` }}>
				<Button disabled={process.includes(context.handleUpdateTask)} onClick={handleUpdateCompleted} agree sx={{ mr: '2rem', backgroundColor: !item.completed && themeContext.colors.default.bg.dark }} />
				<Flex onClick={handleEditTask} width={[1]} pl="1rem" sx={{ cursor: 'pointer' }}>
					<Text sx={{ lineHeight: '3rem' }}>{item.name}</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

export const Skeleton = props => (
	<UISkeleton height="3rem" width={[.9]} mb="1rem" {...props} />
)

export default Item