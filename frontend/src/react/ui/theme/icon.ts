import { css } from 'styled-components'

import { StyledProps } from './theme'

interface Props extends StyledProps {
	background: string,
	currentSort?: boolean,
	width?: string,
	height?: string
}

export default css`
	background: url(${(props: Props) => props.background}) 0 0 / 100% no-repeat;
	width: ${(props: Props) => props.width || '2rem'};
    height: ${(props: Props) => props.height || '2rem'};
    
	${(props: Props) => props.theme.mixin.transition}

	${(props: Props) => !props.currentSort && css`
		opacity: 0.5;
	`}
`
