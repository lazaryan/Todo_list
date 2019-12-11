import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { isEmpty as _isEmpty } from 'lodash'
import styled, { ThemeContext } from 'styled-components'
import { Flex } from 'reflexbox'
import { input as mainThemeInput } from 'theme'

const context = {}

const Component = props => {
	const themeContext = useContext(ThemeContext)

	context.styles = props.styles || (!_isEmpty(themeContext) && themeContext.input || mainThemeInput).styles.default
	
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
	type: 'text'
}

export default Component