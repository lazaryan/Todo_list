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
	}, [props.focus])

	useEffect(() => {
		setValue(props.value)
	}, [props.value])

	const onChange = event => !props.disabled && (
		event.persist(),
		(value => (setValue(value), props.onChange && props.onChange(value)))(validation('onChange')(event.target.value))
	)

	const onBlur = event => !props.disabled && (
		event.persist(),
		(value => (setValue(value), props.onBlur && props.onBlur(value)))(validation('onBlur')(event.target.value))
	)

	const onKeyPress = event => props.keyPress && (process => process && process(value))(({...props.keyPress})[event.key])

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
			<Input type={metaType} value={value} onChange={onChange} onBlur={onBlur} onKeyPress={onKeyPress} ref={inputRef} placeholder={props.placeholder}/>
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