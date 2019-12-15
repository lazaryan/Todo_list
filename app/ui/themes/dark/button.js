import { css } from 'styled-components'
import colors from './colors'
import { button as mainButtonTheme } from 'theme'

const button = css`
	${mainButtonTheme.button}
	background-color: ${colors.bg.blue};
	color: ${colors.color.dark};
`

export const styles = {
	default: button
}

export default styles
