import styled from 'styled-components'

import { Flex } from 'reflexbox'

export const Component = props => {
	return (
		<Flex {...props} />
	)
}

export default styled(Component)`${props => props.theme.skeleton.default}`
