import { css } from 'styled-components'
import { button as ButtonStyles } from './button'
import colors from './colors'

export const container = css`
	position: relative;
	display: inline-block;
`

export const toggle = css`
	
`

export const dropdown = css`
	position: absolute;
	z-index: 2;
	top: calc(100% + .5em);
	right: 0;
	box-shadow: 2px 0 15px ${colors.border.main};
	min-width: 100%;
	border-radius: 5px;

	${props => props.theme.mixin.fade}
`

export const button = css`
	background-color: ${colors.bg.main};
	color: ${colors.color.main};
	border-radius: 0;
	border-bottom: 2px solid ${colors.border.main};

	&:hover, &:focus {
		opacity: 1;
		background-color: ${colors.bg.dark};
	}

	&:last-child {
		border-bottom: none;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	&:first-child {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}

	${props => props.disabled && css`
		opacity: 1;
		color: ${colors.color.light}!important;
		background-color: ${colors.bg.dark};

		&:hover, &:focus {
			opacity: 1;
		}
	`}
`

export const styles = {
	default: {
		container,
		toggle,
		dropdown,
		button
	}
}

export default styles
