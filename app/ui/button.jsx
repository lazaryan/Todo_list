import Proptypes from 'prop-types'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

const context = {}

export const Component = props => (
	context.styles = props.styles,
	<Flex {...props} />
)

Component.propTypes = {
	disabled: Proptypes.bool
}

export default styled(Component)`${props => context.styles || props.theme.button.styles.default}`