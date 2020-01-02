import { useState, useEffect, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { isEmpty as _isEmpty, trim as _trim, replace as _replace } from 'lodash'
import styled from 'styled-components'
import { Flex } from 'reflexbox'

const context = {}

export const Component = props => {
	context.styles = props.styles || {}

	const inputRef = useRef()
	const [value, setValue] = useState(props.value)
	const [metaType] = useState({
		'persentage': 'number'
	}[props.type] || props.type)

	useEffect(() => {
		props.focus && inputRef.current.focus()
	}, [])

	useEffect(() => {
		setValue(props.value)
	}, [props.value])

	const onChange = event => (
		event.persist(),
		(value => (setValue(value), props.onChange && props.onChange(value)))(validation('onChange')(event.target.value))
	)

	const onBlur = event => (
		event.persist(),
		(value => (setValue(value), props.onBlur && props.onBlur(value)))(validation('onBlur')(event.target.value))
	)

	const onKeyUp = event => (process => process && process())(({
		'Enter': () => (inputRef.current.blur(), props.onKeyEnter && props.onKeyEnter()),
		'Escape': () => (inputRef.current.blur(), props.onKeyEscape && props.onKeyEscape()),
	})[event.key])

	const validation = type => value => (validator => validator ? validator(value) : value)(({
		onChange: {
			'text': value => value.length > props.maxLength ? value.substring(0, props.maxLength) : value
		},
		onBlur: {
			'text': value => _trim(_replace(value, /\s+/g, ' '))
		}
	})[type][metaType])

	return (
		<Container sx={props.sx}>
			<Input type={metaType} value={value} disabled={props.disabled} onChange={onChange} onBlur={onBlur} onKeyUp={onKeyUp} ref={inputRef} placeholder={props.placeholder}/>
		</Container>
	)
}

const Container = styled(Flex)`${props => context.styles.container || props.theme.input.styles.default.container}`
const Input = styled.input`${props => context.styles.input || props.theme.input.styles.default.input}`

Component.propTypes = {
	desabled: PropTypes.bool,
	type: PropTypes.oneOf(['text', 'email', 'number', 'persentage']),
	focus: PropTypes.bool,
	maxLength: PropTypes.number,
	placeholder: PropTypes.string
}

Component.defaultProps = {
	value: '',
	type: 'text',
	focus: false,
	maxLength: 127,
	placeholder: ''
}

export default Component