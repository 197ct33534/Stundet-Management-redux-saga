import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from 'utils';
import App from './App';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './scss/index.scss';
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <HistoryRouter history={history}>
            <App />
        </HistoryRouter>
    </Provider>
    // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
