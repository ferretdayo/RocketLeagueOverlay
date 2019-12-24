import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, Middleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { rootReducer } from './redux/stores'

const middlewares: Middleware<any, any, any>[] = [thunk]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
