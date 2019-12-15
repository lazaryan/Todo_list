import { css } from 'styled-components'
import colors from './colors'

export const button = css`
	height: 3rem;
	align-items: center;
	padding: 0 1rem;
	border-radius: 10px;
	background-color: ${colors.bg.green};
	color: #fff;
	text-transform: uppercase;
	font-weight: 500;
	cursor: pointer;
	font-size: 1.2rem;

	&:hover, &:focus {
		opacity: .8;
	}

	${props => props.disabled && css`
		cursor: not-allowed;
		opacity: .3;

		&:hover, &:focus {
			opacity: .3;
		}
	`}
`

export const styles = {
	default: button
}

export default styles