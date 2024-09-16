import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './assets/Store/store.js'
import { Provider } from 'react-redux'

// server.listen();

import { makeServer } from '../src/assets/server.js';

if (
  process.env.NODE_ENV === 'development' &&
  typeof makeServer === 'function'
) {
  makeServer();
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
