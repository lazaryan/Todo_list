import { css } from 'styled-components'
import { input as mainInputTheme } from 'theme'
import colors from './colors'

const container = css`
	${mainInputTheme.styles.default.container}
	border: 2px solid ${colors.border.light};`

const input = css`
	${mainInputTheme.styles.default.input}
	background-color: transparent;
	color: ${colors.color.main};

	&:hover, &:focus {
		border-bottom: 2px solid ${colors.border.main};
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
			border: none;
			padding: 0 .5rem;
		`,
		input
	}
}

export default styles