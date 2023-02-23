import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import rootReducer from './store';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const reduxDevTool =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = configureStore({ reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }), }, reduxDevTool);
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
