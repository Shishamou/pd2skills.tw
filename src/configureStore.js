import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import * as initial from './actions/initial';

const loggerMiddleware = createLogger();

export default function configureStore(initialState = {}) {
    const loggerMiddleware = createLogger();

    var middlewares = [
        thunkMiddleware,
        // loggerMiddleware
    ];
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

    const store = createStoreWithMiddleware(rootReducer);

    store.dispatch(initial.fetchLangs('json/local.json'));
    store.dispatch(initial.fetchSkills('json/skills.json'));
    store.dispatch(initial.fetchPerks('json/perks.json'));
    store.dispatch(initial.fetchInfamy('json/infamy.json'));

    return store;
}
