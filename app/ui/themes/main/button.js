import { css } from 'styled-components'

import { transition } from './mixin'
import colors from './colors'
import iconStyle from './icon'
import { icons } from './mixin'

export const button = css`
	align-items: center;
	justify-content: center;
	padding: 0 1rem;
	border-radius: 10px;
	background-color: ${colors.bg.green};
	color: #fff;
	text-transform: uppercase;
	font-weight: 500;
	cursor: pointer;
	height: 2rem;
	font-size: 1.1rem;
	outline: none;

	${transition}

	&:hover, &:focus {
		opacity: .8;
	}

	${props => props.background && css`
		${iconStyle}
	`}

	${props => props.delete && css`
		${iconStyle}
		background: ${colors.bg.red} url(${icons.cross.white}) 0 0 / 40% no-repeat;
		background-position: center center;
		border-radius: 50%;
	`}

	${props => props.agree && css`
		${iconStyle}
		background: ${colors.bg.green} url(${icons.checkMark.white}) 0 0 / 60% no-repeat;
		background-position: center center;
		border-radius: 50%;
	`}

	${props => props.disabled && css`
		cursor: not-allowed;
		opacity: .3;

		&:hover, &:focus {
			opacity: .3;
		}
	`}
`

export const accent = css`
	${button}
	background-color: ${colors.bg.blue};
`

export const unaccent = css`
	${button}
	background-color: #fff;
	color: ${colors.color.main};
	border: 1px solid ${colors.border.main};

	&:disabled {
		color: ${colors.color.light};
	}
`

export const styles = {
	default: button,
	accent,
	unaccent
}

export default styles