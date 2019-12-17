import { useContext } from 'react'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

const context = {}

export const Component = props => (
	context.styles = props.styles,
	(
		<Flex sx={props.sx}>
			<Text {...props} />
		</Flex>
	)
)

Component.defaultProps = {
	as: 'p'
}

export const Text = styled(props => <props.as {...props}/>)`${props => context.styles || props.theme.text.styles.default}`

export default Component
