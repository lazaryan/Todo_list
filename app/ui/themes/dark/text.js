import { css } from 'styled-components'
import colors from './colors'

export const defaultStyle = css`
	color: ${props => props.color || colors.color.main};
	font-size: ${props => props.fontSize || '1.2rem'};
`

export const label = css`
	${defaultStyle}
	text-transform: uppercase;
	font-weight: 500;
`

export const styles = {
	default: defaultStyle,
	label
}

export default styles
