import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty as _isEmpty } from 'lodash'
import axios from 'axios'

import { ThemeProvider } from 'styled-components'
import { Input, themes } from 'ui'
import { Flex } from 'reflexbox'

import Header from './components/header'

const App = props => {
	const dispatch = useDispatch()

	const appStore = useSelector(state => state.app)

	const [initialised, setInitialised] = useState(false)

	useEffect(() => {
		console.log(appStore)
		setInitialised(true)
	}, [])

	return (
		initialised && <ThemeProvider theme={themes['dark']}>
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