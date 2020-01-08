import { useRef, forwardRef } from 'react'
import styled from 'styled-components'

import { Flex } from 'reflexbox'

export const Component = props => {
	const overlayRef = useRef()

	const handleClickOutside = event =>
		props.onClickOutside && (event.persist(), event.target == overlayRef.current && props.onClickOutside())

	return (
		<Overlay onClick={handleClickOutside} ref={overlayRef}>
			<Container>
				{props.children}
			</Container>
		</Overlay>
	)
}

export const Overlay = styled(forwardRef((props, ref) => <Flex {...props} ref={ref} />))`${props => props.theme.popup.overlay}`
export const Container = styled(Flex)`${props => props.theme.popup.container}`
export const Header = styled(Flex)`${props => props.theme.popup.header}`

Component.Header = Header

export default Component