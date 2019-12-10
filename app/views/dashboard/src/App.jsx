import { useEffect, useState } from 'react'
import { isEmpty as _isEmpty } from 'lodash'
import axios from 'axios'

import { ThemeProvider } from 'styled-components'
import { Input } from 'ui'
import theme from 'theme'
import { Flex } from 'reflexbox'

import Header from './components/header'

const App = props => {
	const [initialised, setInitialised] = useState(false)

	useEffect(() => {
		setInitialised(true)
	}, [])

	return (
		initialised && <Flex width="100%" flexDirection="column">
			<Header />
			<Flex>
				<Input />
			</Flex>
		</Flex>
	)
}

export default () => <ThemeProvider theme={theme}><App /></ThemeProvider>