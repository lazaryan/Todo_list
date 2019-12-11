import { css } from 'styled-components'
import { transition } from './mixin'

const container = css`
	position: relative;
	border: 1px solid #ccc;
	padding: 1rem .5rem .7rem;
	box-sizing: border-box;
	border-radius: 10px;
`

const input = css`
	border: none;
	border-bottom: 2px solid #ccc;
	outline: none;
	padding: 0 .5rem;
	font-size: 1.3rem;

	${transition}

	&:hover, &:focus {
		border-bottom: 2px solid #4AAF77;
	}
`

export const styles = {
	default: {
		container,
		input
	}
}

export default styles