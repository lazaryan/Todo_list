import { css } from 'styled-components'

export default css`
	width: ${props => props.width || '2rem'};
	height: ${props => props.height || '2rem'};
	background: url(${props => props.background}) 0 0 / 100% no-repeat;
`