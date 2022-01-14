import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

import App from './app'

const store = createStore(reducers, applyMiddleware(thunk))

render(<Provider store={store}><App /></Provider>, global.app)