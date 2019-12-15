import { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Flex } from 'reflexbox'

const context = {}

export const Component = props => {
	const themeContext = useContext(ThemeContext)

	context.styles = props.styles || themeContext.text.styles.default

	return(
		<Flex sx={props.sx}>
			<Text {...props} />
		</Flex>
	)
}

Component.defaultProps = {
	as: 'p'
}

export const Text = styled(props => <props.as {...props}/>)`${() => context.styles}`

export default Component
