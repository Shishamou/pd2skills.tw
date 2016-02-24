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

    store.dispatch(initial.fetchLangs('local.json'));
    store.dispatch(initial.fetchSkills('skills.json'));
    store.dispatch(initial.fetchPerks('perks.json'));
    store.dispatch(initial.fetchInfamy('infamy.json'));

    return store;
}
