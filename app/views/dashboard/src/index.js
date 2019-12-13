import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

import App from './App'

render(<Provider store={createStore(reducers, applyMiddleware(thunk))}><App /></Provider>, global.app)