import { css, keyframes } from 'styled-components'
import { skeleton as mainSkeletonTheme } from 'theme'
import colors from './colors'

export const size = '200px'

export default css`
	${mainSkeletonTheme.default}
	background-size: ${size} 100%;
	background: ${colors.bg.main};
	background-image: linear-gradient(90deg, ${colors.bg.main}, ${colors.bg.blue}, ${colors.bg.main});
	border: 1px solid ${colors.border.main};
	background-repeat: no-repeat;
	animation: ${mainSkeletonTheme.animation} 2s ease-in-out infinite;
`