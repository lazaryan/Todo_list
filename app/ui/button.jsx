import Proptypes from 'prop-types'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

const context = {}

export const Component = props => (
	context.styles = props.styles,
	<Button {...props} onClick={() => !props.disabled && props.onClick && props.onClick()} />
)

Component.propTypes = {
	disabled: Proptypes.bool
}

const Button = styled(Flex)`${props => context.styles || props.theme.button.styles.default}`

export default Component