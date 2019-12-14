import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty as _isEmpty } from 'lodash'
import axios from 'axios'

import { ThemeProvider } from 'styled-components'
import { Input, themes } from 'ui'
import { Flex } from 'reflexbox'

import { setState } from './actions'

import Header from './components/header'

const App = props => {
	const dispatch = useDispatch()

	const appStore = useSelector(state => state.app)

	const [initialised, setInitialised] = useState(false)
	const [theme, setTheme] = useState()

	useEffect(() => {
		dispatch(setState())
			.then(({ payload }) => (
				setTheme(payload.theme && themes[payload.theme] || themes['main']),
				setInitialised(true)
			))
	}, [])

	return (
		initialised && <ThemeProvider theme={theme}>
			<Flex width="100%" flexDirection="column">
				<Header />
				<Flex>
					<Input />
				</Flex>
			</Flex>
		</ThemeProvider>
	)
}

export default App