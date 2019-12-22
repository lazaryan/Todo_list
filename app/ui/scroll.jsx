import PropTypes from 'prop-types'

import { Flex } from 'reflexbox'

const Component = props => {
	return (
		<Flex sx={props.sx}>
			<Flex>
				{props.children}
			</Flex>
		</Flex>
	)
}

Component.propTypes = {
	children: PropTypes.node.isRequired
}

export default Component
