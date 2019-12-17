import { useEffect, useState, useContext, Suspense, lazy } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { isEmpty as _isEmpty, last as _last } from 'lodash'
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

	const getQuery = () => queryString.parse(props.location.search)

	const [dispatchingMethods] = useState([
		[
			({ theme }) => theme && theme != 'main' && setThemeApp(theme),
			({ theme }) => theme && themes[theme] && (
				setTheme(themes[theme]),
				context.theme = themes[theme]
			)
		],
		[() => setStateDashboard(getQuery().id)],
		[
			() => setUser(),
			user => !user.access && dispatch({
				type: UPDATE_USER,
				payload: { access: 5 }
			})
		]
	])

	function* updateState() {
		for(let i = 0; i < dispatchingMethods.length; i++) yield;

		yield setInitialised(true)
	}

	useEffect(() => {
		const gen = updateState()

		dispatch(setState())
			.then(({ payload }) => (
				gen.next(),
				dispatchingMethods.forEach(([dispachMethod, callback, error]) => {
					const loadMethod = dispachMethod(payload)

					loadMethod && dispatch(loadMethod)
						.then(({ payload }) =>(
							gen.next(),
							callback && callback(payload)
						))
						.catch(err => (
							console.error(err),
							error && error(err)
						)) || gen.next()
					}
				)
			))
			.catch(console.error)
	}, [])

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