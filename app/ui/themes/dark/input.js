import { css } from 'styled-components'
import { input as mainInputTheme } from 'theme'

const container = css`
	${mainInputTheme.styles.default.container}
	border: 2px solid #ccc;
	background-color: #333333;
`

const input = css`
	${mainInputTheme.styles.default.input}
	background-color: transparent;
	color: #fff;

	&:hover, &:focus {
		border-bottom: 2px solid #56C9EB;
	}
`

export const styles = {
	default: {
		container,
		input
	}
}

export default styles