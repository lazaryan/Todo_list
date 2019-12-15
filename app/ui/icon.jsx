import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Flex } from 'reflexbox'

export const Component = props => (
	<Flex {...props}/>
)

Component.propTypes = {
	background: PropTypes.string.isRequired
}

export default styled(Component)`${props => props.theme.icon.default}`
