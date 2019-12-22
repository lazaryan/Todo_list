import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import OutsideClickHandler from 'react-outside-click-handler'
import { Flex } from 'reflexbox'
import Button from './button'
import { Transition } from 'theme'

const context = {}

export const Component = props => {
	context.styles = props.styles || {}

	const [toggled, setToggled] = useState(false)

	const toggle = (_, state) => !props.disabled && setToggled(state  !== undefined ? state : !toggled)

	return (
		<OutsideClickHandler onOutsideClick={event => toggle(event, false)}>
			<Container sx={props.sx}>
				{
					<Flex onClick={toggle}>{props.toggle}</Flex> ||
					<Toggle onClick={toggle} {...props}>{props.label}</Toggle>
				}
				<Transition in={toggled} delayed={200} classNames="fade">
					<Dropdown flexDirection="column">
						{props.children}
					</Dropdown>
				</Transition>
			</Container>
		</OutsideClickHandler>
	)
}

Component.propTypes = {
	toggle: PropTypes.element,
	label: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired,
}

export const Container = styled(Flex)`${props => context.styles.container || props.theme.dropdown.styles.default.container}`
export const Toggle = styled(Button)`${props => context.styles.toggle || props.theme.dropdown.styles.default.toggle}`
export const Dropdown = styled(Flex)`${props => context.styles.dropdown || props.theme.dropdown.styles.default.dropdown}`
export const DropdownButton = styled(Button)`${props => context.styles.button || props.theme.dropdown.styles.default.button}`

Component.Button = DropdownButton

export default Component
