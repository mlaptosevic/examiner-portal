import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { create } from './store';
import { diagramReducerLegacy } from './reducers/diagramReducerLegacy';
import go from 'gojs';

const gojsKey = process.env.REACT_APP_GOJS_KEY;

if (gojsKey) {
    // tslint:disable-next-line:no-any
    (go as any).licenseKey = gojsKey;
}

ReactDOM.render(
    <Provider store={create(diagramReducerLegacy)}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
