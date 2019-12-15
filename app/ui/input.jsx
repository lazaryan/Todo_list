import { useState, useEffect, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { isEmpty as _isEmpty } from 'lodash'
import styled, { ThemeContext } from 'styled-components'
import { Flex } from 'reflexbox'

const context = {}

export const Component = props => {
	const themeContext = useContext(ThemeContext)

	context.styles = props.styles || themeContext.input.styles.default
	
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

	const onChange = event => !props.disabled && (
		event.persist(),
		(value => (setValue(value), props.onChange && props.onChange(value)))(validation('onChange')(event.target.value))
	)

	const onBlur = event => !props.disabled && (
		event.persist(),
		(value => (setValue(value), props.onBlur && props.onBlur(value)))(validation('onBlur')(event.target.value))
	)

	const validation = type => value => (validator => validator ? validator() : value)(({
		onChange: {},
		onBlur: {}
	})[type][metaType])

	return (
		<Container sx={props.sx}>
			<Input type={metaType} value={value} onChange={onChange} onBlur={onBlur} ref={inputRef} />
		</Container>
	)
}

const Container = styled(Flex)`${() => context.styles.container}`
const Input = styled.input`${() => context.styles.input}`

Component.propTypes = {
	desabled: PropTypes.bool,
	type: PropTypes.oneOf(['text', 'email', 'number', 'persentage']),
	focus: PropTypes.bool,
}

Component.defaultProps = {
	value: '',
	type: 'text',
	focus: false,
}

export default Component