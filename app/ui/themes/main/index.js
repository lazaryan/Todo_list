import { CSSTransition } from 'react-transition-group'

export const input = require('./input')
export const skeleton = require('./skeleton')
export const text = require('./text')
export const icon = require('./icon')
export const button = require('./button')
export const loader = require('./loader')
export const dropdown = require('./dropdown')
export const popup = require('./popup')

export const mixin = require('./mixin')
export const colors = require('./colors')

export const Transition = props => <CSSTransition timeout={props.delayed ? 200 : 0} unmountOnExit {...props} />

export default {
	name: 'main',
	input,
	skeleton,
	text,
	icon,
	button,
	loader,
	dropdown,
	popup,
	mixin,
	colors,
	Transition
}