import { css, keyframes } from 'styled-components'
import colors from './colors'

export const size = '400px'

export const animation = keyframes`
	from {
		background-position: -${size} 0;
	}

	to {
		background-position: calc(${size} + 100%) 0;
	}
`

export default css`
	height: 1rem;
	background: ${colors.bg.dark};
	background-image: linear-gradient(90deg, ${colors.bg.dark}, ${colors.bg.main}, ${colors.bg.dark});
	background-size: ${size} 100%;
	background-repeat: no-repeat;
	line-height: 1;
	display: inline-block;
	border-radius: 5px;
	border: 1px solid ${colors.border.main};
	animation: ${animation} 1.2s ease-in-out infinite;
`