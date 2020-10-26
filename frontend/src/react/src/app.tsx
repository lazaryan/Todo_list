import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider  } from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Flex, Box } from 'reflexbox'
import theme from 'theme'

import { getState } from './actions/app'

import { debouncedImport } from 'utils'

import Header, { Skeleton as HeaderSkeleton } from './header'
const MainPage = React.lazy(() => debouncedImport(() => import('./pages/main')))
const DashboardPage = React.lazy(() => debouncedImport(() => import('./pages/dashboard')))

import { Skeleton as MainPageSkeleton } from './pages/main'
import { Skeleton as DashboardSkeleton } from './pages/dashboard'

export const App = () => {
	const dispatch = useDispatch()
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		dispatch(getState())
			.then(() => setLoading(true))
	}, [])

	return (
		<Flex width="100%" alignItems="center" flexDirection="column" sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
			{!loading ? <Skeleton /> :
				<BrowserRouter basename="/">
                <Route path="" render={({ location }) =>
                    <>
						<Header />
						<Box width="80%">
							<Switch location={location}>
								<Route path="/dashboard/:id">
                            		<React.Suspense fallback={<DashboardSkeleton />}>
                                    	<DashboardPage />
                                	</React.Suspense>
                            	</Route>
								<Route path="/">
                            		<React.Suspense fallback={<MainPageSkeleton />}>
                                    	<MainPage />
                                	</React.Suspense>
                            	</Route>
							</Switch>
						</Box>
					</>
				} />
			</BrowserRouter>
			}
		</Flex>
	)
}

export const Skeleton = () => (
	<Flex width="100%" alignItems="center" flexDirection="column" sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
		<HeaderSkeleton />
	</Flex>
)

export const Component = () => <ThemeProvider theme={theme}><App /></ThemeProvider>

export default Component
