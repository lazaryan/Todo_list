import { css } from 'styled-components'
import { transition } from './mixin'
import colors from './colors'

const container = css`
	position: relative;
	border: 1px solid ${colors.border.main};
	padding: 1rem .5rem .7rem;
	box-sizing: border-box;
	border-radius: 10px;
	background-color: transparent;
	align-self: center;
`

const input = css`
	border: none;
	border-bottom: 2px solid ${colors.border.main};
	outline: none;
	padding: 0 .5rem;
	font-size: 1.3rem;
	background-color: transparent;
	color: ${colors.color.main};
	width: 100%;

	${transition}

	&:hover, &:focus {
		border-bottom: 2px solid ${colors.border.green};
	}
`

export const styles = {
	default: {
		container,
		input
	},
	accent: {
		container: css`
			${container}
			padding: 0 .5rem;
			border: none;
		`,
		input
	}
}

export default styles