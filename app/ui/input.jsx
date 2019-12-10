import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Flex } from 'reflexbox'
import theme from 'theme'

const context = {}

const Component = props => {
	context.styles = props.styles
	
	const [value, setValue] = useState(props.value)
	const [metaType] = useState({
		'persentage': 'number'
	}[props.type] || props.type)

	useEffect(() => {
		setValue(props.value)
	}, [props.value])

	const onChange = event => !props.disabled && (
		event.persist(),
		(value => (setValue(value), props.onChange && props.onChange(value)))(validation('onChange')(event.target.value))
	)

	const validation = type => value => (validator => validator ? validator() : value)(({
		onChange: {

		}
	})[type][metaType])

	return (
		<Container sx={props.sx}>
			<Input type={metaType} value={value} onChange={onChange} />
		</Container>
	)
}

const Container = styled(Flex)`${() => context.styles.container}`
const Input = styled.input`${() => context.styles.input}`

Component.propTypes = {
	desabled: PropTypes.bool,
	type: PropTypes.oneOf(['text', 'email', 'number', 'persentage'])
}

Component.defaultProps = {
	value: '',
	type: 'text',
	styles: theme.input.styles.default
}

export default Component