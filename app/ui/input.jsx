import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'reflexbox'

const Component = props => {
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
		<Flex sx={props.sx}>
			<input type={metaType} value={value} onChange={onChange} />
		</Flex>
	)
}

Component.propTypes = {
	desabled: PropTypes.bool,
	type: PropTypes.oneOf(['text', 'email', 'number', 'persentage'])
}

Component.defaultProps = {
	value: '',
	type: 'text'
}

export default Component