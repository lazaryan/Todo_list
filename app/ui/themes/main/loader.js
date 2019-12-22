import { css, keyframes } from 'styled-components'
import colors from './colors'

export const animateLoader = keyframes`
	0% { opacity: 1 }
	50% { opacity: .3 }
	100% { opacity: 1 }
`

export const container = css`
	width: 100%;
	height: 3px;
	background-color: ${colors.bg.dark};
`

export const loader = css`
	width: 100%;
	height: 100%;
	background: ${colors.bg.blue};

	${props => props.active && css`
		animation: ${animateLoader} 1s infinite 0s ease;
	` || css`
		background: transparent;
	`}
`

export default {
	container,
	loader
}