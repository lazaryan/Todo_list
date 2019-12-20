import Proptypes from 'prop-types'
import { isFunction as _isFunction } from 'lodash'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

const context = {}

export const Component = props => (
	context.styles = _isFunction(props.styles) && props.styles() || props.styles,
	<Button {...props} onClick={() => !props.disabled && props.onClick && props.onClick()} />
)

Component.propTypes = {
	disabled: Proptypes.bool
}

const Button = styled(Flex)`${props => context.styles || props.theme.button.styles.default}`

export default Component