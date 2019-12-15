import { useEffect, useState, useContext, Suspense, lazy } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { isEmpty as _isEmpty } from 'lodash'
import queryString from 'query-string'
import axios from 'axios'

import { ThemeProvider, ThemeContext } from 'styled-components'
import { Input, themes } from 'ui'
import { Flex, Box } from 'reflexbox'

import { setState } from './actions'
import { setState as setStateDashboard } from './actions/dashboard'

import { Skeleton as HeaderSkeleton } from './components/header'

const Header = lazy(() => import('./components/header'))

const context = {
	theme: themes['main']
}

const App = props => {
	const dispatch = useDispatch()

	const [initialised, setInitialised] = useState(false)
	const [theme, setTheme] = useState(themes['main'])

	useEffect(() => {
		dispatch(setState())
			.then(({ payload }) => (
				payload.data.theme && (
					setTheme(themes[payload.data.theme]),
					context.theme = themes[payload.data.theme]
				),
				dispatch(setStateDashboard(getQuery().id))
					.then(() => setInitialised(true))
					.catch(console.error)
			))
			.catch(console.error)
	}, [])

	const getQuery = () => queryString.parse(props.location.search)

	return (
		<ThemeProvider theme={theme}>
			{!initialised && <Skeleton /> ||
			<Flex width="100%" flexDirection="column">
				<Box width="[1]" height="80px" bg={theme.colors.default.bg.dark} p="1.2rem 1rem">
					<Suspense fallback={<HeaderSkeleton />}>
						<Header />
					</Suspense>
				</Box>
				<Box></Box>
			</Flex>}
		</ThemeProvider>
	)
}

export const Skeleton = props => {
	const themeContext = useContext(ThemeContext)

	return (
		<Flex width="100%" flexDirection="column">
			<Box width="[1]" height="80px" bg={themeContext.colors.default.bg.dark} p="1.2rem 1rem">
				<HeaderSkeleton />
			</Box>
		</Flex>
	)
}

export default () => (
	<BrowserRouter>
		<Route path="" render={({ location }) => 
			<Switch location={location}>
				<App />
			</Switch>
		} />
	</BrowserRouter>
)