import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Flex } from 'reflexbox'

export const Loader = props => (
	<Container sx={props.sx}>
		<LoaderLine active={props.active} />
	</Container>
)

Loader.propTypes = {
	active: PropTypes.bool
}

Loader.defaultProps = {
	active: false
}

export const Container = styled(Flex)`${props => props.theme.loader.default.container}`
export const LoaderLine = styled(Flex)`${props => props.theme.loader.default.loader}`

export default Loader
