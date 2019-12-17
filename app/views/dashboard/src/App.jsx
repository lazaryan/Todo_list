import { useEffect, useState, useContext, Suspense, lazy } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { isEmpty as _isEmpty, last as _last, pull as _pull, values as _values } from 'lodash'
import queryString from 'query-string'
import axios from 'axios'

import { ThemeProvider, ThemeContext } from 'styled-components'
import { Input, themes } from 'ui'
import { Flex, Box } from 'reflexbox'

import { setState, setTheme as setThemeApp, setUser } from './actions'
import { setState as setStateDashboard } from './actions/dashboard'

import { UPDATE_USER } from './actions/types'

import { Skeleton as HeaderSkeleton } from './components/header'

const Header = lazy(() => import('./components/header'))

const context = {
	theme: themes['main']
}

const App = props => {
	const dispatch = useDispatch()

	const [initialised, setInitialised] = useState(false)
	const [theme, setTheme] = useState(themes['main'])

	const [process, setProcess] = useState([
		setThemeApp, setUser, setStateDashboard
	])

	useEffect(() => {
		dispatch(setState())
			.then(({ payload }) => {
				payload.theme && payload.theme !== 'main' && dispatch(setThemeApp(payload.theme))
						.then(({ theme }) => theme && themes[theme] && (
							setTheme(themes[theme]),
							context.theme = themes[theme],
							setProcess([..._pull(process, setThemeApp)])
						))
						.catch(console.error) || setProcess([..._pull(process, setThemeApp)])

				dispatch(setStateDashboard(getQuery().id))
					.then(() => setProcess([..._pull(process, setStateDashboard)]))
					.catch(console.error)

				dispatch(setUser())
					.then(userPayload => (
						!userPayload.payload.access && dispatch({
							type: UPDATE_USER,
							payload: { access: _last(_values(payload.data.access)) }
						}),
						setProcess([..._pull(process, setUser)])
					))
					.catch(console.error)
			})
			.catch(console.error)
	}, [])

	useEffect(() => {
		!process.length && setInitialised(true)
	}, [process])

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