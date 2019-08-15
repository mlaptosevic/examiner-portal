import { createStore, applyMiddleware, Middleware, compose } from 'redux';

export const create = mainReducer => {
    const middlewares: Array<Middleware> = [];

    if (process.env.NODE_ENV !== `production`) {
        const { logger } = require(`redux-logger`);
        middlewares.push(logger);
    }

    // @ts-ignore
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(mainReducer, composeEnhancers(applyMiddleware(...middlewares)));
    return store;
};
