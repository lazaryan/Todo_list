import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Flex } from 'reflexbox'

export const Component = props => (
	<Container sx={props.sx}>
		<Loader active={props.active} />
	</Container>
)

Component.propTypes = {
	active: PropTypes.bool
}

Component.defaultProps = {
	active: false
}

export const Container = styled(Flex)`${props => props.theme.loader.default.container}`
export const Loader = styled(Flex)`${props => props.theme.loader.default.loader}`

export default Component
