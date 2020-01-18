import { css } from 'styled-components'
import colors from './colors'

export const overlay = css`
	position: fixed;
	z-index: 10;
	background: rgba(0, 0, 0, .4);
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	justify-content: center;
	align-items: center;

	${props => props.onClickOutside && css`
		cursor: pointer;
	`}
`

export const container = css`
	background-color: ${colors.bg.main};
	border-radius: 10px;
	box-shadow: 2px 0 15px ${colors.border.main};
	flex-direction: column;
	width: 920px;
	overflow: hidden;
`

export const header = css`
	align-items: center;
	padding: 0 1rem;
	border-bottom: 1px solid ${colors.border.main};
	box-shadow: 2px 0 15px ${colors.border.main};
	height: 5rem;
`

export const content = css`
	flex-direction: column;
	padding: 1rem 1rem;
`

export default {
	overlay,
	container,
	header,
	content
}